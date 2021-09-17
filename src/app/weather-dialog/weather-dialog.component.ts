import { Component, OnInit } from '@angular/core';
import { ConnectApiService } from '../services/connect-api.service';

@Component({
  selector: 'app-weather-dialog',
  templateUrl: './weather-dialog.component.html',
  styleUrls: ['./weather-dialog.component.css']
})
export class WeatherDialogComponent implements OnInit 
{
  public outputCity = '';
  constructor(private apiConnect: ConnectApiService) { }

  ngOnInit(): void {
  }

  searchWeather(city: any)
  {
    this.outputCity = city;
    // this.apiConnect.getWeather(city).subscribe(
    //   (result) =>
    //   {
    //     console.log(result);
    //   },
    //   (error) =>
    //   {
    //     console.log(error);
    //   }
    // )
  }

}
