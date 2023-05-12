import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/Service/api.service';

@Component({
  selector: 'order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {

  auth: string;
  orderlist: any[] = [];
  constructor(private route: Router, private api: ApiService) { }

  ngOnInit() {
    this.auth = this.api.getToken();
    this.getOrderList();
  }
  getOrderList() {
    this.api.getOrdersHistory().subscribe(res => {
      this.orderlist = res.orderlist;
    });
  }


}
