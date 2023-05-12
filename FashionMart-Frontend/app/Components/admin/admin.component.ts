import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/Service/api.service';
import { Product } from 'src/app/Model/product';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { NavigationExtras, Router } from '@angular/router';
import { Route } from '@angular/compiler/src/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  products: Product[] = [];
  fileToUpload: File = null;
  showAdd = false;
  auth: string;
  minAmount: Number = 0;
  maxAmount: Number = 10000;
  productname: string = "";
  category: string = "";
  constructor(private api: ApiService, private router: Router) { }
  imageUrl: string = "/assets/img/noimage.png";
  ngOnInit() {
    if (this.api.isAuthenticated) {
      this.auth = this.api.getToken();
      this.api.getProducts(this.productname,this.category,this.minAmount.toString(),this.maxAmount.toString()).subscribe(
        res => {
          this.products = res.oblist;
        }
      );
    }
  }
  handleFileInput(file: FileList) {
    this.fileToUpload = file.item(0);
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
    }
    reader.readAsDataURL(this.fileToUpload);
  }
  show() {
    this.showAdd = true;
  }
  hide() {
    this.showAdd = false;
  }
  addProd(desc:any, quan:any, price:any, prodname:any, category:any, image:any) {
    console.log(category);
    this.api.addProduct(desc.value, quan.value, price.value, prodname.value, category.value, this.fileToUpload).subscribe(res => {
      this.products = res.oblist;
    });
  }
  delProd(prodid:any) {

    this.api.deleteProduct(prodid.value).subscribe(res => {
      this.products = res.oblist;
      this.ngOnInit();
    });
    
  }
  edit(prodid:any) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "user": prodid.value
      }
    };
    this.router.navigate(["admin/edit"], navigationExtras);
  }

  // validation()
}
