import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendService } from '../backend.service';
import { DataService } from '../data.service';
import { Data } from '../model/data';
import { Product } from '../model/product';

@Component({
  selector: 'app-customer-home',
  templateUrl: './customer-home.component.html',
  styleUrls: ['./customer-home.component.css']
})
export class CustomerHomeComponent implements OnInit {

  products: Product[] = [];
  filteredProducts:Product[]=[];
  id: string = "";
  searchValue:string="";

  constructor(private route: ActivatedRoute,
    private router: Router,
    private service: BackendService,
    public dataService: DataService) { }

  ngOnInit(): void {
    this.service.getAllProducts(this.dataService.token).subscribe((res) => {
      this.products = <Product[]> res;
      this.filteredProducts = this.products;
      console.log(res);
      console.log(this.products);
    },(err: HttpErrorResponse) => {
      this.dataService.errorMessage = err.error;
      alert(this.dataService.errorMessage);
      // this.router.navigateByUrl('/error');
      console.log(err.error);
    })
  }

  order(f: NgForm, productName: string){
    console.log("inside order func");
    console.log(f.value);
    console.log(f.value.order);
    console.log(productName);
    this.service.placeOrder(productName, f.value.order, this.dataService.token).subscribe(
      (res) => {
        console.log(res);
        alert(res);
        this.ngOnInit();
      }, (err: HttpErrorResponse) => {
        console.log(err.error);
        this.dataService.errorMessage = err.error;
        alert(this.dataService.errorMessage);
        if(err.error=="Session Expired, Login Again"){
          this.dataService.reset();
          this.router.navigateByUrl('/login');
        }
        // this.router.navigateByUrl('/error')
      }
    );
  }

  onSearchChanges(){
    this.filteredProducts = this.products.filter(x => x.productName.toLowerCase().includes(this.searchValue.toLowerCase()));
  }

}
