import {OfferRepository} from "../core/repositories";
import {Offer, OfferId} from "../core/models";
import fs from 'node:fs/promises';
import path from 'node:path';

interface SerializedOffer {
    id: {
        ip: string;
        identifier: string;
    };
    expiryTime: number;
}

export class FileOfferRepository implements OfferRepository {
    private readonly filePath: string;

    constructor(filePath: string) {
        this.filePath = filePath;
    }

    private async ensureFileExists(): Promise<void> {
        try {
            await fs.mkdir(path.dirname(this.filePath), { recursive: true });
            try {
                await fs.access(this.filePath);
            } catch {
                await fs.writeFile(this.filePath, JSON.stringify({}));
            }
        } catch (error) {
            console.error('Error ensuring file exists:', error);
            throw error;
        }
    }

    private async readFile(): Promise<Record<string, SerializedOffer>> {
        try {
            await this.ensureFileExists();
            const content = await fs.readFile(this.filePath, 'utf-8');
            return JSON.parse(content);
        } catch (error) {
            console.error('Error reading file:', error);
            return {};
        }
    }

    private async writeFile(data: Record<string, SerializedOffer>): Promise<void> {
        await this.ensureFileExists();
        await fs.writeFile(this.filePath, JSON.stringify(data, null, 2));
    }

    private serializeOffer(offer: Offer): SerializedOffer {
        return {
            id: {
                ip: offer.id.ip,
                identifier: offer.id.identifier
            },
            expiryTime: offer.expiryTime
        };
    }

    private deserializeOffer(data: SerializedOffer): Offer {
        const id = OfferId.create(data.id.ip, data.id.identifier);
        return Offer.create(id, data.expiryTime);
    }

    async save(offer: Offer): Promise<void> {
        const maxRetries = 3;
        let retryCount = 0;

        while (retryCount < maxRetries) {
            try {
                const offers = await this.readFile();
                offers[offer.id.toString()] = this.serializeOffer(offer);
                await this.writeFile(offers);
                return;
            } catch (error) {
                retryCount++;
                if (retryCount === maxRetries) {
                    throw error;
                }
                await new Promise(resolve => setTimeout(resolve, 100 * retryCount));
            }
        }
    }

    async findById(id: OfferId): Promise<Offer | undefined> {
        const offers = await this.readFile();
        const serializedOffer = offers[id.toString()];

        if (!serializedOffer) {
            return undefined;
        }

        return this.deserializeOffer(serializedOffer);
    }

    async findAll(): Promise<Offer[]> {
        const offers = await this.readFile();
        return Object.values(offers).map(offer => this.deserializeOffer(offer));
    }
}
