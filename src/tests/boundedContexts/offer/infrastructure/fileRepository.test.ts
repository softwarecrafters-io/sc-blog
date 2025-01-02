import {FileOfferRepository} from "../../../../boundedContexts/offer/infrastructure/fileRepository";
import {Offer, OfferId} from "../../../../boundedContexts/offer/core/models";
import fs from 'node:fs/promises';
import path from 'node:path';
import { existsSync } from 'node:fs';

describe('FileOfferRepository Integration Tests', () => {
    const testFilePath = path.join(__dirname, 'test-offers.json');
    let repository: FileOfferRepository;
    let testOffer: Offer;
    let testId: OfferId;

    beforeEach(async () => {
        // Aseguramos que el directorio de test existe
        await fs.mkdir(path.dirname(testFilePath), { recursive: true });

        // Creamos un nuevo repositorio y oferta de prueba
        repository = new FileOfferRepository(testFilePath);
        testId = OfferId.create('127.0.0.1', 'test-offer');
        testOffer = Offer.createWithDuration(testId, 30);
    });

    afterEach(async () => {
        // Limpiamos el archivo después de cada test
        if (existsSync(testFilePath)) {
            await fs.unlink(testFilePath);
        }
    });

    describe('File Operations', () => {
        it('should create file if it does not exist', async () => {
            await repository.save(testOffer);
            expect(existsSync(testFilePath)).toBe(true);
        });

        it('should persist data between repository instances', async () => {
            // Guardamos con una instancia
            await repository.save(testOffer);

            // Creamos nueva instancia y leemos
            const newRepository = new FileOfferRepository(testFilePath);
            const saved = await newRepository.findById(testId);

            expect(saved?.id.toString()).toBe(testId.toString());
            expect(saved?.expiryTime).toBe(testOffer.expiryTime);
        });
    });

    describe('save', () => {
        it('should save an offer', async () => {
            await repository.save(testOffer);
            const saved = await repository.findById(testId);

            expect(saved?.id.toString()).toBe(testId.toString());
            expect(saved?.expiryTime).toBe(testOffer.expiryTime);
        });

        it('should update existing offer', async () => {
            await repository.save(testOffer);
            const newOffer = Offer.createWithDuration(testId, 60);
            await repository.save(newOffer);

            const saved = await repository.findById(testId);
            expect(saved?.expiryTime).toBe(newOffer.expiryTime);
        });

        it('should handle concurrent saves', async () => {
            // Simulamos múltiples guardados concurrentes
            const saves = Array(5).fill(null).map(() =>
                repository.save(Offer.createWithDuration(
                    OfferId.create('127.0.0.1', Math.random().toString()),
                    30
                ))
            );

            await Promise.all(saves);
            const all = await repository.findAll();
            expect(all).toHaveLength(5);
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

            expect(found?.id.toString()).toBe(testId.toString());
            expect(found?.expiryTime).toBe(testOffer.expiryTime);
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
            expect(results.map(o => o.id.toString()))
                .toEqual(expect.arrayContaining([offer1.id.toString(), offer2.id.toString()]));
        });

        it('should handle empty or corrupted file', async () => {
            // Escribimos un JSON corrupto
            await fs.writeFile(testFilePath, '{corrupted:json');

            await expect(repository.findAll()).rejects.toThrow();
        });
    });

    describe('Error Handling', () => {
        it('should handle file permission errors', async () => {
            // Creamos un archivo sin permisos de escritura
            await fs.writeFile(testFilePath, '{}');
            await fs.chmod(testFilePath, 0o444);

            await expect(repository.save(testOffer)).rejects.toThrow();
        });
    });
});
