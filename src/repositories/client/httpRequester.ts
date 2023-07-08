import {Observable} from "rxjs";
import {fromPromise} from "rxjs/internal/observable/innerFrom";

export class HttpRequester{
    get<T>(url: string, cacheInSeconds:number): Observable<T> {
        return this.request<T>(url, cacheInSeconds);
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
