import { NextRequest, NextResponse } from 'next/server';
import path from 'node:path';
import {FileOfferRepository} from "@/boundedContexts/offer/infrastructure/fileRepository";
import {OfferUseCases} from "@/boundedContexts/offer/application/useCases";

interface OfferResponse {
    identifier: string;
    expiryTime: number;
}

const repository = new FileOfferRepository(
    path.join(process.cwd(), 'data', 'offers.json')
);

const offerUseCases = new OfferUseCases(repository);

export async function GET(request: NextRequest) {
    try {
        const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown';
        const searchParams = request.nextUrl.searchParams;
        const identifier = searchParams.get('identifier');
        const duration = searchParams.get('duration');
        if (!identifier) {
            return Response.json(
                { error: 'Identifier is required' },
                { status: 400 }
            );
        }
        const durationInMinutes = duration ? parseInt(duration, 10) : undefined;
        if (duration && isNaN(durationInMinutes!)) {
            return Response.json(
                { error: 'Duration must be a number' },
                { status: 400 }
            );
        }
        const offer = await offerUseCases.getOrCreate(ip, identifier, durationInMinutes);
        const response: OfferResponse = {
            identifier: offer.id.identifier,
            expiryTime: offer.expiryTime
        };
        return Response.json(response);
    } catch (error) {
        console.error('Error processing offer request:', error);
        if (error instanceof Error && error.message.includes('required')) {
            return Response.json(
                { error: error.message },
                { status: 400 }
            );
        }
        return Response.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
