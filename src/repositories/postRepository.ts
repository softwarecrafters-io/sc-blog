import {Observable} from "rxjs";
import {SummaryPost} from "@/dtos";

export interface PostRepository{
    getAllPosts(): Observable<SummaryPost[]>;
}
