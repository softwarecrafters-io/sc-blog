import {HttpPostRepository} from "@/repositories/client/httpPostRepository";
import {NotionPostRepository} from "@/repositories/server/notionPostRepository";
import {PostRepository, PostRepositoryWithPagination} from "@/core/repositories";
import {BlogService} from "@/application/blogService";
import {HttpRequester} from "@/repositories/client/httpRequester";
import {ThemeStore} from "@/app/store/themeStore";

export class ClientFactory {
    private static postRepository: PostRepositoryWithPagination;
    private static themeStore: ThemeStore;

    public static getPostRepository(): PostRepositoryWithPagination {
        if(this.postRepository == null){
            const baseUri= process.env.PUBLIC_URL as string;
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
