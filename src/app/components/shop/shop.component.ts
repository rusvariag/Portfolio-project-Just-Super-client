import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { Category } from 'src/app/models/category';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
  ) { }

  ngOnInit(): void {
    this.categoryService.fetchCategories().subscribe(categories => {
      this.categoryService.setCategories(categories);
      this.categoryService.setCategory(categories[0]);
    });
    this.categoryService.getCategory().subscribe((category: Category) => {
      if (category._id) {
        this.productService.fetchProducts(category).subscribe(products => {
          this.productService.setProducts(products);
        });
      }
    })
  }
}
