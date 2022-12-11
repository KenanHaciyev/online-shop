import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {Product} from "../../interfaces";
import {ProductService} from "../../shared/product.service";

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {
  products: Product[];
  prodSub: Subscription;
  removeSub: Subscription;
  searchResult: any;

  constructor(private productServ: ProductService) {
  }

  ngOnInit(): void {
    this.prodSub = this.productServ.getAll().subscribe((data: any) => {
      this.products = data
    })
  }

  ngOnDestroy() {
    if (this.prodSub) {
      this.prodSub.unsubscribe()
    }

    if (this.removeSub) {
      this.removeSub.unsubscribe()
    }
  }


  remove(id:any) {
    this.removeSub = this.productServ.remove(id).subscribe(() => {
      this.products = this.products.filter(prod => prod.id !== id)
    })
  }
}
