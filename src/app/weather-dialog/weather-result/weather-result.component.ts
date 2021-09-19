import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { ConnectApiService } from 'src/app/services/connect-api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { apiResponse } from 'src/app/model/apiResponse';
import { Subscription } from 'rxjs';
import * as timeZone from 'moment-timezone';

@Component({
  selector: 'app-weather-result',
  templateUrl: './weather-result.component.html',
  styleUrls: ['./weather-result.component.css']
})
export class WeatherResultComponent implements OnInit, OnChanges, OnDestroy 
{
  @Input() cityInput: string;
  public apiStatus: number;
  private subscription = new Subscription();
  public apiResponse: apiResponse;
  public name: string;
  public temp: number;
  public description: string;
  public country: string;
  public wind: number;
  public pressure: number;
  public humidity: number;
  public sunrise: number;
  public sunset: number;
  public timezone: string;

  constructor(public apiConnect: ConnectApiService,  public snack: MatSnackBar) 
  { }

  ngOnInit(): void {
  }

  ngOnChanges()
  {
    this.searchWeather(this.cityInput);
  }

  searchWeather(city: string)
  {
    if(city)
    {
      this.subscription = this.apiConnect.getWeather(city).subscribe(
        (result: apiResponse) =>
        {          
          console.log(result);
          
          for(let i in result)
          {
            let apiResult = result;
            this.name = apiResult.name;
            this.temp = apiResult.main.temp;
            this.country = apiResult.sys.country;
            this.wind = apiResult.wind.speed;
            this.pressure = apiResult.main.pressure;
            this.humidity = apiResult.main.humidity;
            this.sunrise = apiResult.sys.sunrise;
            this.sunset = apiResult.sys.sunset;
            // console.log(moment().tz("Azja/Tokio").format());
            // let utcHours = new Date(apiResult.timezone).getTimezoneOffset()/60;
            // let utcNegPos = String(utcHours).split('')[0];
            // let utc = Number(String(utcHours).split('')[1]);
            // this.timezone = 'UTC ' + ((utc > 9) ? utcNegPos + utc : utcNegPos + '0' + utc) + ':00';
            // let timezoneCity = cityTimeZones.getTimezone(this.name);
            // console.log(timezoneCity);
            // for(let zone of timezoneCity)
            // {
            //   this.timezone = moment(new Date).tz(zone.timezone).format().substr(19, 6);
            // }
            // for(let j in apiResult.weather)
            // {
            //   this.description = apiResult.weather[j].description;
            // }
          }
        },
        (error) =>
        {
          this.name = '';
          this.apiConnect = error.status;
          this.snack.open(`ERROR: ${error.error.message} ! `,'Close', 
          {
            duration: 4000, 
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
            panelClass: ['snack-error']
          });
        }
      )
    }
  }

  ngOnDestroy()
  {
    this.subscription.unsubscribe();
  }
}
