import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendService } from '../backend.service';
import { DataService } from '../data.service';
import { Data } from '../model/data';
import { LoginCredentials } from '../model/login-credentials';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  user: LoginCredentials;
  loginSuccess:boolean = true;
  constructor(private route: ActivatedRoute,
    private router: Router,
    private service: BackendService,
    public dataService: DataService) {

    this.user = new LoginCredentials();
  }


  loginForm = new FormGroup({
    loginId: new FormControl('',Validators.required),
    password: new FormControl('',Validators.required),
    userType: new FormControl('',Validators.required)
  });

  public submit(value: any) {
    this.user.loginId = value.loginId;
    this.user.password = value.password;
    if(value.userType=="admin"){
      this.user.isUserAdmin=true;
    }else{
      this.user.isUserAdmin = false;
    }
    this.postSubmitActions();
  }

  ngOnInit(): void {
    this.checkLoggedInUser();
  }

  postSubmitActions(){
    this.loginSuccess = true;
    // this.user.loginId = user.loginId;
    // this.user.password = user.password;
    this.service.login(this.user).subscribe((res) => {
      // this.auth = data;
      console.log(res);
      localStorage.setItem("user",JSON.stringify(this.user));
      this.dataService.token="Bearer " + res;
      if(this.user.isUserAdmin){
        this.router.navigateByUrl('/adminHome'); 
      }else{
        this.router.navigateByUrl('/customerHome');
      }
      console.log(this.dataService.token);
    }, (err: HttpErrorResponse) => {
     this.loginSuccess = false;
      // this.router.navigateByUrl('/error');
      console.log(err.error);
    });
    console.log(this.user);
    console.log(this.dataService.token);
  }

  checkLoggedInUser(){
    const user = localStorage.getItem("user");
    if(user){
      const userJSON:any = JSON.parse(user);
      this.user = userJSON;
      this.postSubmitActions();
    }
  }

  register(){ 
    this.router.navigateByUrl('/register');
  }

  forgotPassword(){
    this.router.navigateByUrl('/forgot');
  }

}
