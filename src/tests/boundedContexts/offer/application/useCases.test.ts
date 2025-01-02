import {Offer, OfferId} from "../../../../boundedContexts/offer/core/models";
import {OfferUseCases} from "../../../../boundedContexts/offer/application/useCases";
import {MemoryOfferRepository, OfferRepository} from "../../../../boundedContexts/offer/core/repositories";

describe('OfferUseCases', () => {
    let repository: MemoryOfferRepository;
    let useCases: OfferUseCases;

    beforeEach(() => {
        repository = new MemoryOfferRepository();
        useCases = new OfferUseCases(repository);
    });

    describe('create', () => {
        it('should create a new offer when none exists', async () => {
            const offer = await useCases.create('127.0.0.1', 'test-offer', 30);

            expect(offer).toBeInstanceOf(Offer);
            expect(offer.id.ip).toBe('127.0.0.1');
            expect(offer.id.identifier).toBe('test-offer');
            expect(offer.timeLeft()).toBeGreaterThan(0);
        });

        it('should throw error when active offer exists', async () => {
            // Primero creamos una oferta
            await useCases.create('127.0.0.1', 'test-offer', 30);

            // Intentamos crear otra con el mismo identificador
            await expect(
                useCases.create('127.0.0.1', 'test-offer', 30)
            ).rejects.toThrow('Active offer already exists');
        });

        it('should create new offer when existing offer is expired', async () => {
            // Creamos una oferta que expira inmediatamente
            const offer = await useCases.create('127.0.0.1', 'test-offer', 1/60); // 1 segundo

            // Esperamos a que expire
            await new Promise(resolve => setTimeout(resolve, 1100));

            // Debería permitir crear una nueva oferta
            const newOffer = await useCases.create('127.0.0.1', 'test-offer', 30);
            expect(newOffer).toBeInstanceOf(Offer);
            expect(newOffer.timeLeft()).toBeGreaterThan(0);
        });
    });

    describe('hasActiveOffer', () => {
        it('should return false when offer does not exist', async () => {
            const result = await useCases.hasActiveOffer('127.0.0.1', 'non-existent');
            expect(result).toBe(false);
        });

        it('should return false when offer is expired', async () => {
            // Creamos una oferta que expira inmediatamente
            await useCases.create('127.0.0.1', 'test-offer', 1/60); // 1 segundo

            // Esperamos a que expire
            await new Promise(resolve => setTimeout(resolve, 1100));

            const result = await useCases.hasActiveOffer('127.0.0.1', 'test-offer');
            expect(result).toBe(false);
        });

        it('should return true when active offer exists', async () => {
            await useCases.create('127.0.0.1', 'test-offer', 30);

            const result = await useCases.hasActiveOffer('127.0.0.1', 'test-offer');
            expect(result).toBe(true);
        });

        it('should handle multiple offers independently', async () => {
            await useCases.create('127.0.0.1', 'offer1', 30);
            await useCases.create('127.0.0.1', 'offer2', 30);

            expect(await useCases.hasActiveOffer('127.0.0.1', 'offer1')).toBe(true);
            expect(await useCases.hasActiveOffer('127.0.0.1', 'offer2')).toBe(true);
            expect(await useCases.hasActiveOffer('127.0.0.1', 'offer3')).toBe(false);
        });
    });
});
