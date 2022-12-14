import {Component, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {OrderService} from "../../shared/order.service";

@Component({
  selector: 'app-orders-page',
  templateUrl: './orders-page.component.html',
  styleUrls: ['./orders-page.component.scss']
})
export class OrdersPageComponent implements OnInit {

  orders: any[];
  orderSub: Subscription;
  removeSub: Subscription;

  constructor(private orderServ: OrderService) {
  }

  ngOnInit(): void {
    this.orderSub = this.orderServ.getAll().subscribe((data: any) => {
      this.orders = data
    })
  }

  ngOnDestroy() {
    if (this.orderSub) {
      this.orderSub.unsubscribe()
    }

    if (this.removeSub) {
      this.removeSub.unsubscribe()
    }
  }

  remove(id: any) {
    this.removeSub = this.orderServ.remove(id).subscribe(() => {
      this.orders = this.orders.filter(order => order.id !== id)
    })
  }
}

