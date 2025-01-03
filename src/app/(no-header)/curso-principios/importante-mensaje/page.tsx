import { headers } from 'next/headers';
import {OfferMessage} from "@/app/(no-header)/curso-principios/importante-mensaje/components/OfferMessage";

async function getOffer() {
    const headersList = headers();
    const ip = headersList.get('x-forwarded-for') || 'unknown';
    const host = headersList.get('host') || '';

    const url = process.env.ENV === 'PROD'
        ? `https://${host}/api/offers?identifier=clean-js-offer`  // URL completa en producción
        : 'http://localhost:3010/api/offers?identifier=clean-js-offer';  // URL completa en local

    const response = await fetch(url, {
        headers: {'X-Forwarded-For': ip},
        cache: 'no-store'
    });

    if (!response.ok) {
        throw new Error('Failed to fetch offer');
    }

    return response.json();
}

export default async function ImportantMessage() {
    const offer = await getOffer();
    return <OfferMessage expiryTime={offer.expiryTime} />;
}
