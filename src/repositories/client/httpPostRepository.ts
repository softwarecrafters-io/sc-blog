import {SummaryPost} from "@/dtos";

export class HttpPostRepository {
    baseUrl = "http://127.0.0.1:3005/api/posts";
    private readonly cacheInSeconds = 1;

    getAllPosts(): Promise<SummaryPost[]>{
        return this.request<SummaryPost[]>(this.baseUrl);
    }

    getPostBy(slug:string): Promise<SummaryPost>{
        return this.request<SummaryPost>(`${this.baseUrl}/${slug}`);
    }


    private request<T>(url: string): Promise<T> {
        const options = {
            next: {
                revalidate: this.cacheInSeconds
            }
        };

        return fetch(url, options).then(response => response.json());
    }
}
