import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {

  @Input() productItem: any;
  quantity = '';

  constructor(
    private productService: ProductService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
  }

  chooseProduct(): void {
    this.productService.setProduct(this.productItem);
  }

  open(content): void {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.productItem.quantity = parseInt(this.quantity, 10);
      this.productService.setProduct(this.productItem);
    }, (reason) => {
    });
  }

}
