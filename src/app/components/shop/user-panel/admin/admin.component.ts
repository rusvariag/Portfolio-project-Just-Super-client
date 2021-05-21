import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  faPlusSquare = faPlusSquare;

  productForm: FormGroup;
  categoryList: Category[] = [];
  fileSelected: File = null;
  isInsert = true;

  constructor(
    private builder: FormBuilder,
    private categoryService: CategoryService,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe((category: Category[]) => {
      this.categoryList = category;
    });

    this.productService.getProduct().subscribe((product: Product) => {
      this.productForm.setValue({
        id: product._id,
        name: product.name,
        price: product.price,
        category_id: product.category_id,
        image: '',
      });
      this.isInsert = false;
    });

    this.productForm = this.builder.group({
      id: '',
      name: ['', Validators.required],
      price: ['', Validators.required],
      category_id: ['', Validators.required],
      image: ['', Validators.required],
    });
  }

  onFileSelected(e) {
    this.fileSelected = e.target.files[0];
  }

  newProduct() {
    this.productForm.reset();
    this.isInsert = true;
  }

  submitProduct() {
    const formData = new FormData();
    const myFormValue = this.productForm.value;

    formData.append('name', myFormValue.name);
    formData.append('price', myFormValue.price);
    formData.append('category_id', myFormValue.category_id);

    if (this.isInsert) {
      formData.append('image', this.fileSelected, this.fileSelected.name);
      this.productService.createProduct(formData).subscribe(product => {
        this.productService.insertInnerProductArray(product);
      });
    } else {
      if (this.fileSelected != null) {
        formData.append('image', this.fileSelected, this.fileSelected.name);
      }
      this.productService.updateProduct(myFormValue.id, formData).subscribe(product => {
        this.productService.updateInnerProductArray(product);
      });
    }
    this.productForm.reset();
    this.isInsert = true;
  }

}
