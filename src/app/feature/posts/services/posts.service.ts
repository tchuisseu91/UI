import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from '../models/post.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  
  constructor(private http: HttpClient) { }


  getPosts(tags: string, sortBy: string, direction: string): Observable<Post[]>{
    return this.http.get<Post[]>(`${environment.apiBaseUrl}/api/posts?tags=${tags}&sortBy=${sortBy}&direction=${direction}`);
  }
}
