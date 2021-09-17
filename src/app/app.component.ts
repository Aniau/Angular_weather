import { Component, OnInit } from '@angular/core';
import { ConnectApiService } from './services/connect-api.service';
import { apiResponse } from './model/apiResponse';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit
{
  constructor()
  { }

  ngOnInit(): void
  {
  }

}
