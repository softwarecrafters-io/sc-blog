import {HttpPostRepository} from "@/repositories/client/httpPostRepository";
import {NotionPostRepository} from "@/repositories/server/notionPostRepository";

export class ServerFactory {
    private static postRepository: NotionPostRepository;
    private static httpPostRepository: HttpPostRepository;

    public static getPostRepository(): NotionPostRepository {
        if(this.postRepository== null){
            const apiKey = process.env.NOTION_API_KEY as string;
            const databaseId = process.env.NOTION_BLOG_DATABASE_ID as string;
            this.postRepository = NotionPostRepository.create(apiKey, databaseId);
        }
        return this.postRepository;
    }

    public static getHttpPostRepository(): HttpPostRepository {
        if(this.httpPostRepository== null){
            this.httpPostRepository = new HttpPostRepository();
        }
        return this.httpPostRepository;
    }
}
