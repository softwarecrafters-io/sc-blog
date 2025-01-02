import {OfferRepository} from "../core/repositories";
import {Offer, OfferId} from "../core/models";

export class OfferUseCases {
    constructor(private readonly offerRepository: OfferRepository) {}

    async create(ip: string, identifier: string, durationInMinutes: number): Promise<Offer> {
        const offerId = OfferId.create(ip, identifier);

        if (await this.hasActiveOffer(ip, identifier)) {
            throw new Error('Active offer already exists');
        }

        const offer = Offer.createWithDuration(offerId, durationInMinutes);
        await this.offerRepository.save(offer);

        return offer;
    }

    async hasActiveOffer(ip: string, identifier: string): Promise<boolean> {
        const offerId = OfferId.create(ip, identifier);
        const offer = await this.offerRepository.findById(offerId);

        return offer !== undefined && !offer.isExpired();
    }
}
