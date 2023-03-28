import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginFormComponent } from './login-form/login-form.component';
import { Data } from './model/data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'onlineShoppingPortal';
  data: Data = new Data();
  // subscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ){}

  ngOnInit(): void{
    this.router.navigateByUrl('/login');
  }

}
