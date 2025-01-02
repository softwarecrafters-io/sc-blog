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
    private lockFile: string;
    private retryDelay = 100; // ms
    private maxRetries = 50;

    constructor(private readonly filePath: string) {
        this.lockFile = `${filePath}.lock`;
    }

    async save(offer: Offer): Promise<void> {
        await this.withLock(async () => {
            const offers = await this.readFile();
            offers[offer.id.toString()] = this.serializeOffer(offer);
            await this.writeFile(offers);
        });
    }

    async findById(id: OfferId): Promise<Offer | undefined> {
        return this.withLock(async () => {
            const offers = await this.readFile();
            const serializedOffer = offers[id.toString()];

            if (!serializedOffer) {
                return undefined;
            }

            return this.deserializeOffer(serializedOffer);
        });
    }

    async findAll(): Promise<Offer[]> {
        return this.withLock(async () => {
            const offers = await this.readFile();
            return Object.values(offers).map(offer => this.deserializeOffer(offer));
        });
    }

    private async acquireLock(): Promise<void> {
        let retries = 0;
        while (retries < this.maxRetries) {
            try {
                await fs.writeFile(this.lockFile, '', { flag: 'wx' });
                return;
            } catch (error) {
                retries++;
                await new Promise(resolve => setTimeout(resolve, this.retryDelay));
            }
        }
        throw new Error('Could not acquire lock');
    }

    private async releaseLock(): Promise<void> {
        try {
            await fs.unlink(this.lockFile);
        } catch (error) {
            // Si el archivo no existe, no es un error
        }
    }

    private async withLock<T>(operation: () => Promise<T>): Promise<T> {
        await this.acquireLock();
        try {
            return await operation();
        } finally {
            await this.releaseLock();
        }
    }

    private async ensureFileExists(): Promise<void> {
        try {
            await fs.access(this.filePath);
        } catch {
            await fs.mkdir(path.dirname(this.filePath), { recursive: true });
            await fs.writeFile(this.filePath, JSON.stringify({}));
        }
    }

    private async readFile(): Promise<Record<string, SerializedOffer>> {
        await this.ensureFileExists();
        const content = await fs.readFile(this.filePath, 'utf-8');
        return JSON.parse(content);
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
}
