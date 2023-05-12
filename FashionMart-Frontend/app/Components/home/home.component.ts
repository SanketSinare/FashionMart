import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/Service/api.service';
import { Product } from 'src/app/Model/product';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  products: Product[] = [];
  minAmount: Number;
  maxAmount: Number;
  right: any;
  left: any;
  priceGap: 500;
  productname: string = "";
  category: string = "";

  constructor(private api: ApiService) {
    this.minAmount = 2500;
    this.maxAmount = 7500;

   }

  ngOnInit() {
    if (this.api.isAuthenticated) {
      this.api.getProducts(this.productname, this.category, this.minAmount.toString(), this.maxAmount.toString()).subscribe(
        res => {
          this.products = res.oblist;
        }
      );
    }
  }


  addToCart(e) {
    this.api.addToCart(e).subscribe(res => {
      console.log(res);
    })
  }

  searchByName(e){
    // console.log(e);
    this.productname = e;
    this.category = "All";
    this.api.getProducts(this.productname, this.category, this.minAmount.toString(), this.maxAmount.toString()).subscribe(
      res => {
        this.products = res.oblist;
        // console.log(res.oblist);
        
      }
    );
    
  }

  onChangeCategory(e){
    this.category = e;
    this.api.getProducts(this.productname, this.category, this.minAmount.toString(), this.maxAmount.toString()).subscribe(
      res => {
        this.products = res.oblist;
      }
    );
  }

  searchByMinAmount(e){
    this.minAmount = e;
    this.left = (<number> this.minAmount / 10000) + "%";
    this.api.getProducts(this.productname, this.category, this.minAmount.toString(), this.maxAmount.toString()).subscribe(
      res => {
        this.products = res.oblist;
      }
    );
  }
  searchByMaxAmount(e){
    this.maxAmount = e;
    this.right = 100 - (<number>this.maxAmount / 10000) * 100 + "%";
    this.api.getProducts(this.productname, this.category, this.minAmount.toString(), this.maxAmount.toString()).subscribe(
      res => {
        this.products = res.oblist;
      }
    );
  }


}
