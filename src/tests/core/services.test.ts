import {PaginationService} from "../../core/services";
import {Post} from "../../core/models";

describe('PaginationService', () => {
    const fakePosts: any[] = [
        { id: '1' }, { id: '2' }, { id: '3' }, { id: '4' }, { id: '5' }, { id: '6' },
    ];

    let paginationService: PaginationService;

    beforeEach(() => {
        paginationService = new PaginationService(fakePosts);
    });

    it('should paginate fakePosts correctly', () => {
        const paginatedPosts = paginationService.paginatePosts(1);
        expect(paginatedPosts).toEqual(fakePosts.slice(0, 4));
    });

    it('should calculate total pages correctly', () => {
        const totalPages = paginationService.calculateTotalPages();
        expect(totalPages).toEqual(2);
    });

    it('should calculate next page correctly', () => {
        const nextPage = paginationService.nextPage(1);
        expect(nextPage).toEqual(2);
    });

    it('should calculate previous page correctly', () => {
        const prevPage = paginationService.previousPage(2);
        expect(prevPage).toEqual(1);
    });
});
