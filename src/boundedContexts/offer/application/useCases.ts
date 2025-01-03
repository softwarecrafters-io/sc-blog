import {OfferRepository} from "../core/repositories";
import {Offer, OfferId} from "../core/models";

export class OfferUseCases {
    constructor(private readonly offerRepository: OfferRepository) {}

    async getOrCreate(ip: string, identifier: string, durationInMinutes: number = 30): Promise<Offer> {
        const offerId = OfferId.create(ip, identifier);
        const existingOffer = await this.offerRepository.findById(offerId);

        if (existingOffer) {
            return existingOffer;
        }

        const offer = Offer.createWithDuration(offerId, durationInMinutes);
        await this.offerRepository.save(offer);

        return offer;
    }
}


