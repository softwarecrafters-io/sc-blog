import { Client } from '@notionhq/client';
import {NotionPostRepository} from "@/repositories/server/notionPostRepository";
const notion = new Client({ auth: process.env.NOTION_API_KEY });

export default async function Notion() {
    const notionRepository = NotionPostRepository.create();
    console.log(await notionRepository.getAllPosts());
    return (
        <>
            <div>notion...</div>
        </>
    );
}
