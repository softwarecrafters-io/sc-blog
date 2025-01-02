import {Offer, OfferId} from "@/boundedContexts/offer/core/models";

export interface OfferRepository {
    save(offer: Offer): Promise<void>;
    findById(id: OfferId): Promise<Offer | undefined>;
    findAll(): Promise<Offer[]>;
}


export class MemoryOfferRepository implements OfferRepository {
    private offers: Map<string, Offer>;

    constructor() {
        this.offers = new Map();
    }

    async save(offer: Offer): Promise<void> {
        this.offers.set(offer.id.toString(), offer);
    }

    async findById(id: OfferId): Promise<Offer | undefined> {
        return this.offers.get(id.toString());
    }

    async findAll(): Promise<Offer[]> {
        return Array.from(this.offers.values());
    }
}
