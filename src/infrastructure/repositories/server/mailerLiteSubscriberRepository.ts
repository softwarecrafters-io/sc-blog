import {from, map, Observable, of} from "rxjs";
import {fromPromise} from "rxjs/internal/observable/innerFrom";
import {Subscriber} from "@/core/models";
import {SubscriberRepository} from "@/core/repositories";

export class MailerLiteSubscriberRepository implements SubscriberRepository{
    constructor(private apiKey: string, private groupId: string) {}

    addSubscriber(email:string){
        return fromPromise(this.requestToAddSubscribers(email))
    }

    getNumberOfSubscribers() {
        return from(this.requestToGetNumberOfSubscribers()).pipe(
        // return of({total: 29000}).pipe(
            map(data => data.total)
        );
    }

    private requestToGetNumberOfSubscribers(){
        const header = this.header();
        const method = 'GET';
        const url = `https://api.mailerlite.com/api/v2/${this.groupId}/count`;
        return fetch(url, {method, headers: header}).then(res => res.json())
    }

    private requestToAddSubscribers(email:string){
        const header = this.header();
        const fields = {marketing_permissions: 'acepto'}
        const body = JSON.stringify({email, resubscribe: false, type: 'confirmed', fields});
        const method = 'POST';
        const url = `https://api.mailerlite.com/api/v2/groups/${this.groupId}/subscribers`;
        return fetch(url, {method, headers: header, body}).then(res => res.json() as Promise<Subscriber>)
    }

    private header() {
        return {
            accept: 'application/json',
            'X-MailerLite-ApiDocs': 'true',
            'content-type': 'application/json',
            'X-MailerLite-ApiKey': this.apiKey
        } as any;
    }
}

