import {HttpPostRepository} from "@/repositories/client/httpPostRepository";
import {NotionPostRepository} from "@/repositories/server/notionPostRepository";
import {PostRepository} from "@/core/repositories";
import {BlogService} from "@/application/blogService";
import {HttpRequester} from "@/repositories/client/httpRequester";
import {ThemeStore} from "@/app/store/themeStore";

export class ClientFactory {
    private static postRepository: PostRepository;
    private static themeStore: ThemeStore;

    public static getPostRepository(): PostRepository {
        if(this.postRepository == null){
            const baseUri= "http://127.0.0.1:3005";
            const requester = new HttpRequester(baseUri)
            this.postRepository = new HttpPostRepository(requester);
        }
        return this.postRepository;
    }

    static createBlogService(): BlogService {
        return new BlogService(this.getPostRepository());
    }

    static getThemeStore(): ThemeStore{
        if(this.themeStore == null){
            this.themeStore = new ThemeStore();
        }
        return this.themeStore;
    }
}
