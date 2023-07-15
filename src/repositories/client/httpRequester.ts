import {from, Observable} from "rxjs";
import {fromPromise} from "rxjs/internal/observable/innerFrom";

interface PaginationParams {
    page: number;
}

export class HttpRequester {
    constructor(private baseUri: string, private cacheInSeconds = 30) {}

    get<T>(url: string, params?: PaginationParams): Observable<T> {
        return this.request<T>(this.baseUri + url, this.cacheInSeconds, params);
    }

    private request<T>(url: string, cacheInSeconds: number, params?: PaginationParams): Observable<T> {
        const queryParams = new URLSearchParams(params as Record<string, any>).toString();
        const fullUrl = `${url}?${queryParams}`;
        console.log(fullUrl)
        const options = {
            method: 'GET',
            next:{
                revalidate: cacheInSeconds
            },
            headers: {
                'Content-Type': 'application/json',
            },
        };

        return from(fetch(fullUrl, options).then(response => response.json()));
    }
}
