import {Offer, OfferId} from "../../../../boundedContexts/offer/core/models";
import {MemoryOfferRepository} from "../../../../boundedContexts/offer/core/repositories";

describe('MemoryOfferRepository', () => {
    let repository: MemoryOfferRepository;
    let testOffer: Offer;
    let testId: OfferId;

    beforeEach(() => {
        repository = new MemoryOfferRepository();
        testId = OfferId.create('127.0.0.1', 'test-offer');
        testOffer = Offer.createWithDuration(testId, 30);
    });

    describe('save', () => {
        it('should save an offer', async () => {
            await repository.save(testOffer);
            const saved = await repository.findById(testId);
            expect(saved).toEqual(testOffer);
        });

        it('should update existing offer', async () => {
            await repository.save(testOffer);
            const newOffer = Offer.createWithDuration(testId, 60);
            await repository.save(newOffer);

            const saved = await repository.findById(testId);
            expect(saved).toEqual(newOffer);
        });
    });

    describe('findById', () => {
        it('should return undefined for non-existent offer', async () => {
            const nonExistentId = OfferId.create('127.0.0.1', 'non-existent');
            const result = await repository.findById(nonExistentId);
            expect(result).toBeUndefined();
        });

        it('should find existing offer', async () => {
            await repository.save(testOffer);
            const found = await repository.findById(testId);
            expect(found).toEqual(testOffer);
        });
    });

    describe('findAll', () => {
        it('should return empty array when no offers exist', async () => {
            const results = await repository.findAll();
            expect(results).toEqual([]);
        });

        it('should return all saved offers', async () => {
            const offer1 = Offer.createWithDuration(
                OfferId.create('127.0.0.1', 'offer1'),
                30
            );
            const offer2 = Offer.createWithDuration(
                OfferId.create('127.0.0.1', 'offer2'),
                30
            );

            await repository.save(offer1);
            await repository.save(offer2);

            const results = await repository.findAll();
            expect(results).toHaveLength(2);
            expect(results).toContainEqual(offer1);
            expect(results).toContainEqual(offer2);
        });
    });
});
