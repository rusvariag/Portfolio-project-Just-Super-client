import { Component, OnInit } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-search-panel',
  templateUrl: './search-panel.component.html',
  styleUrls: ['./search-panel.component.scss']
})
export class SearchPanelComponent implements OnInit {

  searchForm: FormGroup;

  faSearch = faSearch;

  constructor(
    private builder: FormBuilder,
    private productServices: ProductService,
  ) { }

  ngOnInit(): void {
    this.searchForm = this.builder.group({
      searchValue: '',
    });
  }

  submit() {
    this.productServices.searcProducts(this.searchForm.value).subscribe(products => {
      this.productServices.setProducts(products);
    });
  }

}
