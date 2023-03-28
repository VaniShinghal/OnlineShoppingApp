import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendService } from '../backend.service';
import { DataService } from '../data.service';
import { Product } from '../model/product';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {

  
  products: Product[] = [];
  id: string = "";
  // @Input() data: Data = new Data();

  constructor(private route: ActivatedRoute,
    private router: Router,
    private service: BackendService,
    public dataService: DataService) { }

  ngOnInit(): void {
    this.service.getAllProducts(this.dataService.token).subscribe((res) => {
      this.products = <Product[]> res;
      console.log(res);
      console.log(this.products);
    },(err: HttpErrorResponse) => {
      this.dataService.errorMessage = err.error;
      //this.router.navigateByUrl('/error');
      console.log(err.error);
      if(err.error=="Session Expired, Login Again"){
        this.dataService.reset();
        this.router.navigateByUrl('/login');
      }
    })
  }

  changeStatus(productName: string, productStatus: string){
    if(productStatus=="OUT OF STOCK"){
      productStatus="HURRY UP TO PURCHASE";
    }else if(productStatus=="HURRY UP TO PURCHASE"){
      productStatus="OUT OF STOCK";
    }
    console.log("inside status func");
    console.log(productName + " " + productStatus);
    this.service.updateProduct(productName, productStatus, this.dataService.token).subscribe(
      (res) => {
        console.log(res);
        // this.router.navigateByUrl('/adminHome', {skipLocationChange:true});
        this.ngOnInit();
      }, (err: any) => {
        console.log("from error block admin")
        console.log(err);
        console.log(err.error);
        this.dataService.errorMessage = err.error;
        alert(err.error);
        if(err.error=="Session Expired, Login Again"){
          this.dataService.reset();
          this.router.navigateByUrl('/login');
        }
        // this.router.navigateByUrl('/error')
      }
    );
  }

  deleteProduct(productName: string){
    console.log("inside status func");
    console.log(productName);
    this.service.deleteProduct(productName, this.dataService.token).subscribe(
      (res) => {
        console.log(res);
        // this.router.navigateByUrl('/adminHome',{skipLocationChange:true});
        this.ngOnInit();
      }, (err: HttpErrorResponse) => {
        console.log(err.error);
        this.dataService.errorMessage = err.error;
        alert(err.error);
        // this.router.navigateByUrl('/error')
      }
    );
  }

  addProduct(){
    this.router.navigateByUrl('/addProduct');
  }

}
