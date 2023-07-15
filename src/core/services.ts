import {Post, SummarizedPost} from "./models";

export class PaginationService{
    constructor(private readonly posts:SummarizedPost[], readonly pageSize = 4){}

    paginatePosts(currentPage:number): SummarizedPost[] {
        const startIndex = this.pageSize * (currentPage - 1);
        return this.posts.slice(startIndex, startIndex + this.pageSize);
    }

    calculateTotalPages(): number {
        return Math.ceil(this.posts.length / this.pageSize);
    }

    nextPage(currentPage: number): number {
        let lastPage = this.calculateTotalPages();
        if (currentPage >= lastPage) {
            return lastPage;
        }
        return currentPage + 1;
    }

    previousPage(currentPage: number): number {
        if (currentPage <= 1) {
            return 1;
        }
        return currentPage - 1;
    }
}
