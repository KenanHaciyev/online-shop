import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProductService} from "../shared/product.service";
import {Product} from "../interfaces";
import {Observable, switchMap} from "rxjs";

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit {
  productId:string
  product$:Observable<Product>;
  constructor(private activatedRoute:ActivatedRoute,
              private productServ:ProductService) { }

  ngOnInit(): void {
    this.productId = this.activatedRoute.snapshot.params['id']
    this.product$ = this.productServ.getById(this.productId)

  }

  addToCart(product: Product) {
    this.productServ.addToCart(product)
  }
}
