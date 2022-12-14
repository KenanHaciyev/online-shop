import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../shared/product.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Product} from "../../interfaces";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit {
  product: Product;
  form: FormGroup;
  submitted: boolean = false;

  constructor(
    private productServ: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.productServ.getById(this.route.snapshot.params['id']).subscribe(data => {
      this.product = data
      this.form = new FormGroup({
        type: new FormControl(this.product.type, Validators.required),
        title: new FormControl(this.product.title, Validators.required),
        photo: new FormControl(this.product.photo, Validators.required),
        info: new FormControl(this.product.info, Validators.required),
        price: new FormControl(this.product.price, Validators.required),
      })
    })
  }

  submit(){
    if(this.form.invalid){
      return
    }

    this.submitted = true

    this.productServ.update({
      ...this.product,
      type: this.form.value.type,
      title: this.form.value.title,
      photo: this.form.value.photo,
      info: this.form.value.info,
      price: this.form.value.price,
      date: new Date()
    }).subscribe(() => {
      this.submitted=false
      this.router.navigate(['/admin', 'dashboard'])
    })
  }
}
