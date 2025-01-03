import {Offer} from "../../../../boundedContexts/offer/core/models";
import {OfferUseCases} from "../../../../boundedContexts/offer/application/useCases";
import {MemoryOfferRepository} from "../../../../boundedContexts/offer/core/repositories";

describe('OfferUseCases', () => {
    let repository: MemoryOfferRepository;
    let useCases: OfferUseCases;

    beforeEach(() => {
        repository = new MemoryOfferRepository();
        useCases = new OfferUseCases(repository);
    });

    describe('getOrCreate', () => {
        it('should create new offer when none exists', async () => {
            const offer = await useCases.getOrCreate('127.0.0.1', 'test-offer');

            expect(offer).toBeInstanceOf(Offer);
            expect(offer.id.ip).toBe('127.0.0.1');
            expect(offer.id.identifier).toBe('test-offer');
            expect(offer.timeLeft()).toBeGreaterThan(0);
        });

        it('should use default duration when not provided', async () => {
            const offer = await useCases.getOrCreate('127.0.0.1', 'test-offer');
            const expectedMinDuration = 30 * 60 * 1000; // 30 minutes in milliseconds

            expect(offer.expiryTime - Date.now()).toBeGreaterThanOrEqual(expectedMinDuration - 100);
            expect(offer.expiryTime - Date.now()).toBeLessThanOrEqual(expectedMinDuration + 100);
        });

        it('should use provided duration when creating new offer', async () => {
            const durationInMinutes = 60;
            const offer = await useCases.getOrCreate('127.0.0.1', 'test-offer', durationInMinutes);
            const expectedDuration = durationInMinutes * 60 * 1000;

            expect(offer.expiryTime - Date.now()).toBeGreaterThanOrEqual(expectedDuration - 100);
            expect(offer.expiryTime - Date.now()).toBeLessThanOrEqual(expectedDuration + 100);
        });

        it('should return existing offer without creating new one', async () => {
            const firstOffer = await useCases.getOrCreate('127.0.0.1', 'test-offer', 60);
            const secondOffer = await useCases.getOrCreate('127.0.0.1', 'test-offer', 30);

            expect(secondOffer.expiryTime).toBe(firstOffer.expiryTime);
        });

        it('should create different offers for different identifiers', async () => {
            const offer1 = await useCases.getOrCreate('127.0.0.1', 'offer1');
            await delay(10);
            const offer2 = await useCases.getOrCreate('127.0.0.1', 'offer2');

            expect(offer1.id.toString()).not.toBe(offer2.id.toString());
            expect(offer1.expiryTime).not.toBe(offer2.expiryTime);
        });

        it('should create different offers for different IPs', async () => {
            const offer1 = await useCases.getOrCreate('127.0.0.1', 'test-offer');
            await delay(100);
            const offer2 = await useCases.getOrCreate('192.168.1.1', 'test-offer');

            expect(offer1.id.toString()).not.toBe(offer2.id.toString());
            expect(offer1.expiryTime).not.toBe(offer2.expiryTime);
        });
    });
});

function delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}
