import {NextResponse} from "next/server";
import {ServerFactory} from "@/factories/serverFactory";

const handler = async (req: Request) => {
    const body = await req.json()
    const { email } = body;
    const newsletterService = ServerFactory.createNewsletterService();
    return await newsletterService.addSubscriber(email).toPromise()
}

export function POST(request:Request){
    return NextResponse.json(handler(request));
}
