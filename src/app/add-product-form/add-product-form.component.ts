import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendService } from '../backend.service';
import { DataService } from '../data.service';
import { Data } from '../model/data';
import { Product } from '../model/product';

@Component({
  selector: 'app-add-product-form',
  templateUrl: './add-product-form.component.html',
  styleUrls: ['./add-product-form.component.css']
})
export class AddProductFormComponent implements OnInit {

  @Input() data = new Data();
  product: Product = new Product();

  constructor(private route: ActivatedRoute,
    private router: Router,
    private service: BackendService,
    public dataService: DataService) { }

  productForm = new FormGroup({
    productName: new FormControl(''),
    productDescription: new FormControl(''),
    price: new FormControl(''),
    features: new FormControl(''),
    productStatus: new FormControl(''),
    noOfProducts: new FormControl('')
  });
  public submit(value: any) {
    console.log(value);
    this.product.productName = value.productName;
    this.product.productDescription = value.productDescription;
    this.product.price = value.price;
    this.product.features = value.features;
    this.product.productStatus = value.productStatus;
    this.product.noOfOrders = 0;
    this.product.noOfProducts = value.noOfProducts;
    console.log(this.product);
    this.service.addProduct(this.product.productName,this.product, this.dataService.token).subscribe((res) => {
      this.nextpage();
      console.log(res);
    }, (err: HttpErrorResponse) => {
      this.dataService.errorMessage = err.error;
      alert(err.error);
      // this.router.navigateByUrl('/error');
      console.log(err.error);
      if(err.error=="Session Expired, Login Again"){
        this.dataService.reset();
        this.router.navigateByUrl('/login');
      }
    });
    console.log(this.dataService.token);
  }
  nextpage() {
    this.router.navigateByUrl('/adminHome');
  }
  ngOnInit(): void {
  }

}
