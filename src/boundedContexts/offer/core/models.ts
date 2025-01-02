export class OfferId {
    private constructor(
        public readonly ip: string,
        public readonly identifier: string
    ) {}

    static create(ip: string, identifier: string): OfferId {
        this.validate(ip, identifier);
        return new OfferId(ip, identifier);
    }

    private static validate(ip: string, identifier: string): void {
        if (!ip?.trim()) {
            throw new Error('IP is required');
        }
        if (!identifier?.trim()) {
            throw new Error('Identifier is required');
        }
    }

    equals(other: OfferId): boolean {
        return this.ip === other.ip && this.identifier === other.identifier;
    }

    toString(): string {
        return `${this.ip}:${this.identifier}`;
    }
}

export class Offer {
    private constructor(
        public readonly id: OfferId,
        public readonly expiryTime: number
    ) {}

    static create(id: OfferId, expiryTime: number): Offer {
        this.validateExpiryTime(expiryTime);
        return new Offer(id, expiryTime);
    }

    static createWithDuration(id: OfferId, durationInMinutes: number): Offer {
        this.validateDuration(durationInMinutes);
        const expiryTime = Date.now() + durationInMinutes * 60 * 1000;
        return new Offer(id, expiryTime);
    }

    private static validateExpiryTime(expiryTime: number): void {
        if (expiryTime <= Date.now()) {
            throw new Error('Expiry time must be in the future');
        }
    }

    private static validateDuration(durationInMinutes: number): void {
        if (durationInMinutes <= 0) {
            throw new Error('Duration must be positive');
        }
    }

    isExpired(): boolean {
        return this.expiryTime <= this.currentTimeProvider();
    }

    timeLeft(): number {
        return Math.max(0, this.expiryTime - this.currentTimeProvider());
    }

    private currentTimeProvider() {
        return Date.now();
    }
}
