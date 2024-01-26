import { Component, OnDestroy, OnInit } from '@angular/core';
import { PostsService } from '../services/posts.service';
import { Observable, Subscription } from 'rxjs';
import { Post } from '../models/post.model';
import { PostSearchRequest } from '../models/post-search-request';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css']
})
export class PostsListComponent implements OnInit, OnDestroy {

  private getPostServiceSubscription? : Subscription;

   sortByValues: string[] = ['Id', 'Reads', 'Likes', 'Popularity'];
   directions: string[] = ['Asc', 'Desc'];

  request : PostSearchRequest = {
    tags: '',
    sortBy: '',
    direction: ''
  }

  model? : Post[];

  constructor(private postService: PostsService){
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.getPostServiceSubscription?.unsubscribe();
  }

  getPosts(): void{
    
    if(this.request.tags !== null && this.request.tags.length <= 0){
      alert('Tags is mandatory');
      return;
    }

    if(this.request.sortBy !== null &&this.request.sortBy.length<=0){
      this.request.sortBy = 'Id';
    }

    if(this.request.direction !== null &&this.request.direction.length<=0){
      this.request.direction = 'Asc';
    }
     
    this.getPostServiceSubscription = this.postService.getPosts(this.request.tags, this.request.sortBy, this.request.direction)
      .subscribe({
        next: (response) => {
          this.model = response;
        },
        error: (error) => {
          alert('Something went wrong inthe server. Check logs files for more details');
        }
      });
  }


}
