import {Component, OnInit} from '@angular/core';
import {ProductService} from "../shared/product.service";
import {Product} from "../interfaces";

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent implements OnInit {
  cartProducts: Product[] = []
  totalPrice: number = 0

  constructor(private productServ: ProductService) {
  }

  ngOnInit(): void {
    this.cartProducts = this.productServ.productsCart
    console.log(this.cartProducts)
    for (let i = 0; i < this.cartProducts.length; i++) {
      this.totalPrice += +this.cartProducts[i].price!
    }
  }
}
