import {Observable} from "rxjs";
import {Subscriber, Post} from "@/core/models";

export interface PostRepository{
    getAllPosts(): Observable<Post[]>;
}

export interface SubscriberRepository{
    getNumberOfSubscribers(): Observable<number>;
    addSubscriber(email: string): Observable<Subscriber>;
}
