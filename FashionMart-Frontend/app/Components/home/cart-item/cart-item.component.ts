import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/Service/api.service';
import { Cart } from 'src/app/Model/cart';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {

  private auth: string;
  cartlist: Cart[];
  name: String;
  placeStatus: string;
  totalSum: number = 0;
  constructor(private api: ApiService, private route: Router) {

  }

  ngOnInit() {
    this.api.getCartItems().subscribe(res => {
      this.cartlist = res.oblist;
      this.name = res.oblist[0].email;      
      this.cartlist.forEach(value => {
        this.totalSum = this.totalSum + (value.quantity * value.price);
      });      
    });

    const payment = document.getElementById('payment');
    if (payment != null) {
      payment.style.display = 'none';
    }
  }
  updateCart(id:any, quantity:any) {
    this.api.updateCartItem(id.value, quantity.value).subscribe(res => {
      this.cartlist = res.oblist;
      this.cartlist.forEach(value => {
        this.totalSum = this.totalSum + (value.quantity * value.price);
      });
    });
    
  }
  deleteItem(id:any) {
    this.api.deleteCartItem(id.value).subscribe(res => {
      this.cartlist = res.oblist;
      this.totalSum=0;
      this.cartlist.forEach(value => {
        
        this.totalSum = this.totalSum + (value.quantity * value.price);
      });
    });
  }

  placeOrder() {
    //console.log("response");
    
    this.api.placeOrder().subscribe(res => {
      this.placeStatus = res.status;
      if(this.placeStatus == "200"){
        alert('order is placed!!');
      }else{
        alert('order is not placed due to insufficient quantity!!');
      }
    });
    this.route.navigate(['/home']);
  }

  displayPayment(){
    const cart = document.getElementById('cart');

    if (cart != null) {
      cart.style.display = 'none';
    }

    const payment = document.getElementById('payment');
    if (payment != null) {
      payment.style.display = 'block';
    }
  }

}
