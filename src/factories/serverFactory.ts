import {HttpPostRepository} from "@/repositories/client/httpPostRepository";
import {NotionPostRepository} from "@/repositories/server/notionPostRepository";
import {PostRepository} from "@/core/repositories";
import {BlogService} from "@/application/blogService";

export class ServerFactory {
    private static postRepository: PostRepository;

    static getPostRepository(): PostRepository {
        if(this.postRepository== null){
            const apiKey = process.env.NOTION_API_KEY as string;
            const databaseId = process.env.NOTION_BLOG_DATABASE_ID as string;
            this.postRepository = NotionPostRepository.create(apiKey, databaseId);
        }
        return this.postRepository;
    }

    static createBlogService(): BlogService {
        return new BlogService(this.getPostRepository());
    }
}
