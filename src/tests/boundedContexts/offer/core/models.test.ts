import {Offer, OfferId} from "../../../../boundedContexts/offer/core/models";

describe('OfferId', () => {
    it('should create a valid offer id', () => {
        const id = OfferId.create('127.0.0.1', 'black-friday');
        expect(id.ip).toBe('127.0.0.1');
        expect(id.identifier).toBe('black-friday');
    });

    it('should throw error when ip is empty', () => {
        expect(() => OfferId.create('', 'black-friday')).toThrow('IP is required');
    });

    it('should throw error when ip is only whitespace', () => {
        expect(() => OfferId.create('  ', 'black-friday')).toThrow('IP is required');
    });

    it('should throw error when identifier is empty', () => {
        expect(() => OfferId.create('127.0.0.1', '')).toThrow('Identifier is required');
    });

    it('should throw error when identifier is only whitespace', () => {
        expect(() => OfferId.create('127.0.0.1', '  ')).toThrow('Identifier is required');
    });

    it('should compare offer ids correctly', () => {
        const id1 = OfferId.create('127.0.0.1', 'black-friday');
        const id2 = OfferId.create('127.0.0.1', 'black-friday');
        const id3 = OfferId.create('127.0.0.1', 'cyber-monday');

        expect(id1.equals(id2)).toBe(true);
        expect(id1.equals(id3)).toBe(false);
    });
});

describe('Offer', () => {
    let validId: OfferId;

    beforeEach(() => {
        validId = OfferId.create('127.0.0.1', 'test');
    });

    describe('create', () => {
        it('should create a valid offer with explicit expiry time', () => {
            const futureTime = Date.now() + 1000;
            const offer = Offer.create(validId, futureTime);

            expect(offer.id).toBe(validId);
            expect(offer.expiryTime).toBe(futureTime);
        });

        it('should throw error when expiry time is in the past', () => {
            const pastTime = Date.now() - 1000;
            expect(() => Offer.create(validId, pastTime)).toThrow();
        });
    });

    describe('createWithDuration', () => {
        it('should create a valid offer with duration', () => {
            const offer = Offer.createWithDuration(validId, 30);
            const expectedExpiry = Date.now() + 30 * 60 * 1000;

            expect(offer.id).toBe(validId);
            expect(offer.expiryTime).toBeGreaterThan(expectedExpiry - 100);
            expect(offer.expiryTime).toBeLessThan(expectedExpiry + 100);
        });

        it('should throw error with zero duration', () => {
            expect(() => Offer.createWithDuration(validId, 0)).toThrow();
        });

        it('should throw error with negative duration', () => {
            expect(() => Offer.createWithDuration(validId, -30)).toThrow();
        });
    });

    describe('expiration checks', () => {
        it('should correctly check if offer is expired', () => {
            const now = Date.now();
            const offer = Offer.create(validId, now + 1000);

            // Mock the current time for consistent testing
            const currentTimeProvider = jest.fn();
            currentTimeProvider.mockReturnValue(now);
            Object.defineProperty(offer, 'currentTimeProvider', {
                value: currentTimeProvider
            });

            expect(offer.isExpired()).toBe(false);

            currentTimeProvider.mockReturnValue(now + 1001);
            expect(offer.isExpired()).toBe(true);
        });

        it('should calculate remaining time correctly', () => {
            const now = Date.now();
            const offer = Offer.create(validId, now + 1000);

            const currentTimeProvider = jest.fn();
            currentTimeProvider.mockReturnValue(now);
            Object.defineProperty(offer, 'currentTimeProvider', {
                value: currentTimeProvider
            });

            expect(offer.timeLeft()).toBe(1000);

            currentTimeProvider.mockReturnValue(now + 400);
            expect(offer.timeLeft()).toBe(600);

            currentTimeProvider.mockReturnValue(now + 1100);
            expect(offer.timeLeft()).toBe(0);
        });
    });
});
