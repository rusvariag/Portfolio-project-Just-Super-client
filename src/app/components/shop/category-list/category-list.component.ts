import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {

  categoryList: Category[] = [];

  constructor(
    private categoryService: CategoryService,
  ) { }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe((categories: Category[]) => {
      this.categoryList = categories;
    });
  }

  getProducts(e): void {
    const category = this.categoryList.find(item => item._id === e.target.id);
    this.categoryService.setCategory(category);
  }

}
