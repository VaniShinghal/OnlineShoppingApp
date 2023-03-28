import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  userDetails:any;
  constructor(
    private dataservice: DataService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const user = localStorage.getItem("user");
    if(user){
      this.userDetails = JSON.parse(user);
    }
  }

  logout(){
    this.dataservice.reset()
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }

}
