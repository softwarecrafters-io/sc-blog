import {NextResponse} from "next/server";
import {addSubscriber} from "@/repositories/server/subscriptionService";

const handler = async (req: Request) => {
    const body = await req.json()
    const { email } = body;
    const apiKey = process.env.MAILER_API_KEY as string;
    return await addSubscriber(email, apiKey);
}

export function POST(request:Request){
    return NextResponse.json(handler(request));
}
