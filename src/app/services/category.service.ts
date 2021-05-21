import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, BehaviorSubject } from 'rxjs';

import { Category } from 'src/app/models/category';

import { categoryUrl } from 'src/app/config/api';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  categories = new Subject;
  category = new BehaviorSubject({});

  constructor(private http: HttpClient) { }

  setCategory(category) {
    this.category.next(category);
  }

  getCategory() {
    return this.category.asObservable();
  }

  setCategories(categories) {
    this.categories.next(categories);
  }

  getCategories() {
    return this.categories.asObservable();
  }

  fetchCategories() {
    return this.http.get<Category[]>(categoryUrl);
  }

  revealCategory(): any {
    return this.category.value;
  }

}
