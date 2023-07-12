import {Client} from "@notionhq/client";
import {fromPostToSummary, fromSummaryToPost, Post, SummarizedPost} from "../../core/models";
import {NotionToMarkdown} from "notion-to-md";
import {PostRepository} from "../../core/repositories";
import {defaultIfEmpty, forkJoin, map, mergeMap, Observable, of, tap} from "rxjs";
import {fromPromise} from "rxjs/internal/observable/innerFrom";

export class NotionPostRepository implements PostRepository{
    client: Client
    notionToMarkdown: NotionToMarkdown;
    private posts: Post[] = [];
    private requestTimestamp: number = 0;

    private constructor(private apiKey:string, private databaseId:string, private cacheInMs:number) {
        this.client = new Client({ auth: apiKey });
        this.notionToMarkdown = new NotionToMarkdown({ notionClient: this.client });
    }

    //five minutes cache by default
    static create(apiKey:string, databaseId:string, cacheInMsSeconds = 300000): NotionPostRepository {
        if(!apiKey || !databaseId){
            throw new Error('Notion API Key or Database ID not found');
        }
        return new NotionPostRepository(apiKey, databaseId, cacheInMsSeconds);
    }

    summarizedPosts() {
        return this.allPosts().pipe(
            map(posts => posts.map(post => fromPostToSummary(post)))
        );
    }

    postBy(slug: string) {
        return this.allPosts().pipe(
            map(posts => posts.find(post => post.slug === slug))
        )
    }

    summarizedPostsByTag(tag: string) {
        return this.summarizedPosts().pipe(
            map(posts => posts.filter(post => post.tags.includes(tag)))
        )
    }

    summarizedPostsByUser(username: string) {
        return this.summarizedPosts().pipe(
            map(posts => posts.filter(post => post.username === username))
        )
    }

    allPosts(): Observable<Post[]> {
        if (this.requestTimestamp + this.cacheInMs <= Date.now()) {
            return this.requestPosts().pipe(
                map(sps => sps.map(sp => this.summaryPostToPost(sp))),
                mergeMap(posts => forkJoin(posts).pipe(defaultIfEmpty([]))),
                tap(posts => this.posts = posts),
            );
        }
        return of(this.posts);
    }

    private summaryPostToPost(summaryPost: SummarizedPost): Observable<Post> {
        return fromPromise(this.notionToMarkdown.pageToMarkdown(summaryPost.id)).pipe(
            map(blocks => this.notionToMarkdown.toMarkdownString(blocks)),
            map(body => fromSummaryToPost(summaryPost, body.parent)
        ));
    }

    private requestPosts(): Observable<SummarizedPost[]> {
        this.requestTimestamp = Date.now();
        return fromPromise(this.notionRequest()).pipe(
            map(r => r.results
                .map(p => this.pageToPostTransformer(p))
                .filter(p => p != null) as SummarizedPost[]
            )
        );
    }

    private notionRequest() {
        return this.client.databases.query({
            database_id: this.databaseId,
            filter: {
                property: 'Published',
                checkbox: {
                    equals: true
                }
            }
        });
    }

    private pageToPostTransformer(page: any): SummarizedPost | undefined {
        const summaryPost = {
            id: this.extractId(page),
            cover: this.extractCover(page),
            title: this.extractTitle(page),
            tags: this.extractTags(page),
            category: this.extractCategory(page),
            description: this.extractDescription(page),
            date: this.extractDate(page),
            slug: this.extractSlug(page),
            username: this.extractUserName(page),
            userPicture: this.extractUserPicture(page)
        };
        const missingFields = Object.keys(summaryPost).filter(key => !(summaryPost as any)[key]);
        if (missingFields.length > 0) {
            const message = `Post ${summaryPost.title} is missing fields: ${missingFields.join(", ")}`;
            console.warn(message);
            return undefined;
        }
        return summaryPost as SummarizedPost;
    }
    private extractId(page: any): string {
        return page.id;
    }

    private extractCover(page: any): string | undefined {
        if (!page.cover) {
            return undefined;
        }
        const cover = page.cover;
        const isUknownCoverType = cover.type !== 'file' && cover.type !== 'external';
        if (isUknownCoverType) {
            return undefined;
        }
        return cover.type === 'file' ? cover.file : cover.external.url;
    }

    private extractTitle(page: any): string {
        return page.properties?.Name?.title[0]?.plain_text;
    }

    private extractTags(page: any): string[] {
        return page.properties?.Tags?.multi_select?.map((t: any) => t.name);
    }

    private extractDescription(page: any): string {
        return page.properties?.Description?.rich_text[0]?.plain_text;
    }

    private extractDate(page: any): string {
        return page.properties?.Updated?.date?.start;
    }

    private extractSlug(page: any): string {
        return page.properties?.Slug?.rich_text[0]?.plain_text;
    }

    private extractUserName(page: any) {
        return page.properties?.Username?.rich_text[0]?.plain_text;
    }

    private extractUserPicture(page: any) {
        return page.properties?.UserPicture?.files[0]?.name;
    }

    private extractCategory(page: any) {
        return page.properties?.Category?.select?.name;
    }
}
