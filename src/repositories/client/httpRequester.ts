import {Observable} from "rxjs";
import {fromPromise} from "rxjs/internal/observable/innerFrom";

export class HttpRequester{
    constructor(private baseUri: string, private cacheInSeconds = 30) {}
    get<T>(url: string): Observable<T> {
        return this.request<T>(this.baseUri + url, this.cacheInSeconds);
    }

    private request<T>(url: string, cacheInSeconds:number): Observable<T> {
        const options = {
            next: {
                revalidate: cacheInSeconds
            }
        };

        return fromPromise(fetch(url, options).then(response => response.json()));
    }
}
