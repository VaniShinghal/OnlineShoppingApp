import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendService } from '../backend.service';
import { DataService } from '../data.service';
import { Data } from '../model/data';
import { ForgotPass } from '../model/forgot-pass';

@Component({
  selector: 'app-forgot-password-form',
  templateUrl: './forgot-password-form.component.html',
  styleUrls: ['./forgot-password-form.component.css']
})
export class ForgotPasswordFormComponent implements OnInit {

  @Input() data = new Data();

  forgotPass: ForgotPass = new ForgotPass();
  constructor(private route: ActivatedRoute,
    private router: Router ,
    private service: BackendService,
    private dataService: DataService) { }
  
    forgotForm = new FormGroup({
      loginId: new FormControl(''),
      newPass: new FormControl('')
    });

    public submit(value: any) {
      this.forgotPass.LoginId = value.loginId;
      this.service.forgot(value.loginId, value.newPass) .subscribe((res) => {
        this.nextpage();
      }, (err: HttpErrorResponse) => {
        this.dataService.errorMessage = err.error;
        alert(this.dataService.errorMessage);
        // this.router.navigateByUrl('/error');
        console.log(err.error);
      });
    }
  nextpage() {
    this.router.navigateByUrl('/login');
  }
  ngOnInit(): void {
  }

}
