import { Component, Input, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Data } from '../model/data';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {
  constructor(
    public dataService: DataService
  ) {
   }

  ngOnInit(): void {
  }

}
