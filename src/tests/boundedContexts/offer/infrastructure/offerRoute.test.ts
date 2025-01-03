import { NextRequest } from 'next/server';
import { GET } from '@/app/api/offers/route';
import path from 'node:path';
import fs from 'node:fs/promises';
import { existsSync } from 'node:fs';

describe('Offers API Integration Tests', () => {
    const dataDir = path.join(process.cwd(), 'data');
    const testFile = path.join(dataDir, 'offers.json');

    beforeAll(async () => {
        await fs.mkdir(dataDir, { recursive: true });
    });

    afterEach(async () => {
        if (existsSync(testFile)) {
            await fs.unlink(testFile);
        }
        if (existsSync(`${testFile}.lock`)) {
            await fs.unlink(`${testFile}.lock`);
        }
    });

    function createMockRequest(identifier?: string, duration?: string, ip: string = '127.0.0.1'): NextRequest {
        const url = new URL('http://localhost');
        if (identifier) url.searchParams.set('identifier', identifier);
        if (duration) url.searchParams.set('duration', duration);

        return new NextRequest(url, {
            headers: new Headers({
                'x-forwarded-for': ip
            })
        } as any);
    }

    it('should create a new offer when none exists', async () => {
        const request = createMockRequest('test-offer');
        const response = await GET(request);
        const data = await response.json();

        expect(response.status).toBe(200);
        expect(data).toHaveProperty('identifier', 'test-offer');
        expect(data).toHaveProperty('expiryTime');
        expect(typeof data.expiryTime).toBe('number');
    });

    it('should return existing offer for same ip and identifier', async () => {
        const firstRequest = createMockRequest('test-offer');
        const firstResponse = await GET(firstRequest);
        const firstData = await firstResponse.json();

        const secondRequest = createMockRequest('test-offer');
        const secondResponse = await GET(secondRequest);
        const secondData = await secondResponse.json();

        expect(secondData.expiryTime).toBe(firstData.expiryTime);
    });

    it('should create different offers for different IPs', async () => {
        const request1 = createMockRequest('test-offer', undefined, '127.0.0.1');
        await delay(100);
        const request2 = createMockRequest('test-offer', undefined, '127.0.0.2');

        const response1 = await GET(request1);
        const response2 = await GET(request2);

        const data1 = await response1.json();
        const data2 = await response2.json();

        expect(data1.expiryTime).not.toBe(data2.expiryTime);
    });

    it('should handle custom duration', async () => {
        const duration = '60'; // 60 minutes
        const request = createMockRequest('test-offer', duration);
        const response = await GET(request);
        const data = await response.json();

        const expectedMinDuration = 60 * 60 * 1000; // 60 minutes in milliseconds
        const timeLeft = data.expiryTime - Date.now();

        expect(timeLeft).toBeGreaterThanOrEqual(expectedMinDuration - 1000);
        expect(timeLeft).toBeLessThanOrEqual(expectedMinDuration + 1000);
    });

    it('should return 400 if identifier is missing', async () => {
        const request = createMockRequest();
        const response = await GET(request);

        expect(response.status).toBe(400);
        const data = await response.json();
        expect(data).toHaveProperty('error', 'Identifier is required');
    });

    it('should return 400 if duration is invalid', async () => {
        const request = createMockRequest('test-offer', 'invalid');
        const response = await GET(request);

        expect(response.status).toBe(400);
        const data = await response.json();
        expect(data).toHaveProperty('error', 'Duration must be a number');
    });

    it('should handle concurrent requests', async () => {
        const requests = Array(5).fill(null).map((_, i) =>
            GET(createMockRequest(`offer-${i}`))
        );

        const responses = await Promise.all(requests);
        expect(responses).toHaveLength(5);
        responses.forEach(response => {
            expect(response.status).toBe(200);
        });
    });
});

function delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}
