import {HttpPostRepository} from "@/repositories/client/httpPostRepository";
import {NotionPostRepository} from "@/repositories/server/notionPostRepository";
import {PostRepository} from "@/core/repositories";
import {BlogService} from "@/application/blogService";
import {HttpRequester} from "@/repositories/client/httpRequester";

export class ClientFactory {
    private static postRepository: PostRepository;

    public static getPostRepository(): PostRepository {
        if(this.postRepository == null){
            const baseUri= "http://127.0.0.1:3005/";
            const requester = new HttpRequester()
            this.postRepository = new HttpPostRepository(requester, baseUri);
        }
        return this.postRepository;
    }

    static createBlogService(): BlogService {
        return new BlogService(this.getPostRepository());
    }
}
