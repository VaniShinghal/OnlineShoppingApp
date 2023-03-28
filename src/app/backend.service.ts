import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { LoginCredentials } from './model/login-credentials';
import { ForgotPass } from './model/forgot-pass';
import { Customer } from './model/customer';
import { Admin } from './model/admin';
import { Product } from './model/product';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  url: string = environment.apiURL;
  header = {
    Authorization: this.data.token
  }
  constructor(
    private client: HttpClient,
    private data: DataService
  ) { }

    public register(customer: Customer){
      return this.client.post(this.url+"register", customer, { responseType: 'text' });
    }

    public login(loginCreds: LoginCredentials){
      return this.client.post(this.url+"login", loginCreds, { responseType: 'text' });
    }
    
    public forgot(customerId: string, newPass: string){
      return this.client.post(this.url+customerId+"/forgot",newPass, { responseType: 'text' });
    }
    
    public getAllProducts(token: string){
      console.log("token in service "+token);
      this.header.Authorization = token;
      console.log("get all ");
      console.log(this.header);
      return this.client.get(this.url+"all", {headers: this.header});
    }

    // public searchProduct(searchTerm: string, token: string){
    //   this.header.Authorization = token;
    //   return this.client.get(this.url+"search/"+searchTerm, {headers: this.header});
    // }

    public addProduct(productName: string, product: Product, token: string){
      this.header.Authorization = token;
      return this.client.post(this.url+productName+"/add", product, {headers: this.header, responseType: 'text' });
    }

    public updateProduct(productName: string, productStatus: string, token: string){
      this.header.Authorization = token;
      console.log("From Backend service:" + token + " " + this.url + " " + productName + " " + productStatus);
      console.log(this.header);
      return this.client.put(this.url+productName+"/update/"+productStatus,null, {headers: this.header, responseType:'text'});
    }

    public deleteProduct(productName: string, token: string){
      this.header.Authorization = token;
      return this.client.delete(this.url+productName+"/delete", {headers: this.header, responseType: 'text' });
    }

    public placeOrder(productName: string, noOfOrders: number, token: string){
      this.header.Authorization = token;
      console.log(this.url+productName+"/"+noOfOrders);
      return this.client.put(this.url+productName+"/"+noOfOrders,null, {headers: this.header, responseType:'text'});
      
    }

}
