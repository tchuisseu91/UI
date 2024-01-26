import { Component, OnDestroy, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category.model';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit, OnDestroy{

categories?: Category[];
private getAllCategoriesSubscription? : Subscription;

  constructor(private categoryService: CategoryService){
  }
  ngOnDestroy(): void {
    this.getAllCategoriesSubscription?.unsubscribe();
  }

  ngOnInit(): void {
   this.getAllCategoriesSubscription = this.categoryService.getAllCategories()
    .subscribe({
      next: (response) => {
        this.categories = response;
      }
    });
  }
}
