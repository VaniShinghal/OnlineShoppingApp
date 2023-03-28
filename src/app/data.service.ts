import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  token: string = "token";
  errorMessage: string = "Some Error Occured";
  
  reset(){
    this.token = "token"
    this.errorMessage = "Some Error Occured"
  }

}
