import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/Model/product';
import { ApiService } from 'src/app/Service/api.service';

@Component({
  selector: 'product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  products: any;
  productid: number;
  private routeSub: Subscription;

  constructor(private api: ApiService, private route: ActivatedRoute) { 


    if (this.api.isAuthenticated) {

      this.routeSub = this.route.params.subscribe(params => {
        
        this.productid = parseInt(params['id']);
        this.api.getProductId(this.productid).subscribe(
          res => {
            this.products = res.oblist[0];
            console.log(this.products);
            
          }
        );
      });
      
    }
  }

  ngOnInit() {
  }

  addToCart(e) {
    this.api.addToCart(e).subscribe(res => {
      console.log(res);
    })
  }

}
