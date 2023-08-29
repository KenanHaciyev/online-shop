import {Component, Input, OnInit} from '@angular/core';
import {Product} from "../../interfaces";
import {ProductService} from "../../shared/product.service";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  @Input() product:Product;
  constructor(private productServ:ProductService) { }

  ngOnInit(): void {
  }

  addToCart(product: Product) {
    this.productServ.addToCart(product)
  }
}
