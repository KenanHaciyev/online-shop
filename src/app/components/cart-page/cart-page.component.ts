import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../shared/product.service";
import {Product} from "../../interfaces";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {OrderService} from "../../shared/order.service";

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent implements OnInit {
  cartProducts: Product[] = []
  totalPrice: number = 0
  form: FormGroup
  submitted: boolean;
  added:string;
  constructor(private productServ: ProductService,
              private orderServ: OrderService) {
  }

  ngOnInit(): void {
    this.cartProducts = this.productServ.productsCart
    for (let i = 0; i < this.cartProducts.length; i++) {
      this.totalPrice += +this.cartProducts[i].price!
    }

    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      phone: new FormControl(null, Validators.required),
      address: new FormControl(null, Validators.required),
      payment: new FormControl('Cash', Validators.required),
    })
  }

  submit() {
    if (this.form.invalid) {
      return
    }

    this.submitted = true

    const order = {
      name: this.form.value.name,
      address: this.form.value.address,
      phone: this.form.value.phone,
      payment: this.form.value.payment,
      price: this.totalPrice,
      date: new Date(),
      orders:this.cartProducts,
    }

    this.orderServ.send(order).subscribe(res => {
      this.form.reset()
      this.submitted = false
      this.added = 'Order is framed'
      this.cartProducts = []
      setTimeout(() => {
        this.added = ''
      },2000)
      alert('For checking orders - let`s go to admin page,' +
        'tap on "Online shop" in the left and write in url "/admin", ' +
        'login is: admin@mail.com, password is: 123456')
    })
  }

  delete(product:Product) {
    this.totalPrice = this.totalPrice - +product.price!
    this.cartProducts = this.cartProducts.filter((elem:Product) => elem.id !==product.id)
  }
}
