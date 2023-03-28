import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup, ValidatorFn } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendService } from '../backend.service';
import { DataService } from '../data.service';
import { Customer } from '../model/customer';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {

  user: Customer = new Customer();
  msg: string = "";
  errorMsg: string = "";

  constructor(private route: ActivatedRoute,
    private router: Router,
    private service: BackendService,
    private dataService: DataService) { }

  ngOnInit(): void {
  }

  
  registerForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    loginId: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
    contactNumber : new FormControl('')
  });

  public submit(value: any) {
    if(value.password==value.confirmPassword){
      this.errorMsg=""
    this.user.firstName = value.firstName;
    this.user.lastName = value.lastName;
    this.user.email = value.email;
    this.user.loginId = value.loginId;
    this.user.password = value.password;
    this.user.contactNumber = value.contactNumber;
    this.service.register(this.user).subscribe((res) => {
      console.log(res);
      this.router.navigateByUrl('/login');
    }, (err: HttpErrorResponse) => {
      // this.msg = err.error;
      this.dataService.errorMessage=err.error;
      console.log(err.error); 
      alert(err.error);
      // this.router.navigateByUrl('/error');
    });
  }else{
    this.errorMsg = "Passwords Doesn't match";
  }
  }
/*
  confirmPasswordValid(): ValidatorFn {
    return () => {
      if (this.registerForm.value.password !== this.registerForm.value.password)
        return { match_error: 'Value does not match' };
      return null;
    };
  }*/

}
