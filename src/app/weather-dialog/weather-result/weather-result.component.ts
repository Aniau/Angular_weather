import { Component, ComponentFactoryResolver, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { ConnectApiService } from 'src/app/services/connect-api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { apiResponse } from 'src/app/model/apiResponse';
import { Observable, Subscription, interval } from 'rxjs';
import * as moment from 'moment-timezone';
import * as cityTimezone from 'city-timezones';
import { map, share } from 'rxjs/operators';

@Component({
  selector: 'app-weather-result',
  templateUrl: './weather-result.component.html',
  styleUrls: ['./weather-result.component.css']
})
export class WeatherResultComponent implements OnInit, OnChanges, OnDestroy 
{
  @Input() cityInput: string;
  public apiStatus: number;
  private subscriptionWeather = new Subscription();
  private subscriptionSunSetRise = new Subscription();
  public apiResponse: apiResponse;
  public nameCity: string;
  public temp: number;
  public description: string;
  public country: string;
  public wind: number;
  public pressure: number;
  public humidity: number;
  public sunrise: Date;
  public sunset: Date;
  public timezone: string;
  public currentDate: Date;

  constructor(public apiConnect: ConnectApiService,  public snack: MatSnackBar) 
  { 

  }

  ngOnInit(): void {
    if(this.currentDate)
    {
      this.runCurrentTime(this.currentDate);
      console.log(this.currentDate);
    }
  }
 

  ngOnChanges()
  {
    this.searchWeather(this.cityInput);
  }

  searchWeather(city: string)
  {
    if(city)
    {
      this.subscriptionWeather = this.apiConnect.getWeather(city).subscribe(
        (result: apiResponse) =>
        {          
          let apiResult = result;
          console.log(result);
          this.nameCity = apiResult.name;
          this.temp = apiResult.main.temp;
          this.country = apiResult.sys.country;
          this.wind = apiResult.wind.speed;
          this.pressure = apiResult.main.pressure;
          this.humidity = apiResult.main.humidity;
          
          let timezoneCity = cityTimezone.findFromCityStateProvince(this.nameCity);
          for(let weather of apiResult.weather)
          {
            this.description = weather.description;
          }
          for(let zone of timezoneCity)
          {
            if(zone.city === this.nameCity)
            {
              this.timezone = moment().tz(zone.timezone).format().substr(19, 16);
              let sign = moment().tz(zone.timezone).format().substr(19,1);
              this.getSunriseSet(apiResult.coord.lat, apiResult.coord.lon, this.timezone, sign);
            }
          }
        },
        (error) =>
        {
          this.nameCity = '';
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

  getSunriseSet(lat: number, lng: number, timezone: string, sign: string)
  {
    this.subscriptionSunSetRise = this.apiConnect.getSun(lat, lng).subscribe(
      result => {
        let dateSunrise = new Date();
        let dateSunset = new Date();
        let utcSunriseHours = 0;
        let utcSunriseMinutes = 0;
        let utcSunsetHours = 0;
        let utcSunsetMinutes = 0;
        let utcCurrentHours = 0;
        let utcCurrentMinutes = 0;
        this.currentDate = new Date();
        
        if(timezone.split(':')[1] === '00')
        {
          utcSunriseHours = (sign === '+') ? Number(timezone.split('+')[1].split(':')[0]) + Number(result.results.sunrise.split(':')[0]) : Number(timezone.split('-')[1].split(':')[0]) - Number(result.results.sunrise.split(':')[0]);
          utcSunriseMinutes = Number(result.results.sunrise.split(':')[1]);
          utcSunsetHours = (sign === '+') ? Number(timezone.split('+')[1].split(':')[0]) + Number(result.results.sunset.split(':')[0]) : Number(timezone.split('-')[1].split(':')[0]) - Number(result.results.sunset.split(':')[0]);
          utcSunsetMinutes = Number(result.results.sunset.split(':')[1]);
          utcCurrentHours = (sign === '+') ? Number(timezone.split('+')[1].split(':')[0]) : Number(timezone.split('-')[1].split(':')[0]);
        }
        else
        {
          utcSunriseHours = (sign === '+') ? Number(timezone.split('+')[1].split(':')[0]) + Number(result.results.sunrise.split(':')[0]) : Number(timezone.split('-')[1].split(':')[0]) - Number(result.results.sunrise.split(':')[0]);
          utcSunriseMinutes = (sign === '+') ? Number(timezone.split('+')[1].split(':')[1]) + Number(result.results.sunrise.split(':')[1]) : Number(timezone.split('-')[1].split(':')[1]) - Number(result.results.sunrise.split(':')[1]);
          utcSunsetHours = (sign === '+') ? Number(timezone.split('+')[1].split(':')[0]) + Number(result.results.sunset.split(':')[0]) : Number(timezone.split('-')[1].split(':')[0]) - Number(result.results.sunset.split(':')[0]);
          utcSunsetMinutes = (sign === '+') ? Number(timezone.split('+')[1].split(':')[1]) + Number(result.results.sunset.split(':')[1]) : Number(timezone.split('-')[1].split(':')[1]) - Number(result.results.sunset.split(':')[1]);
          utcCurrentMinutes = (sign === '+') ? Number(timezone.split('+')[1].split(':')[0]) : Number(timezone.split('-')[1].split(':')[0]);
          utcCurrentHours = (sign === '+') ? Number(timezone.split('+')[1].split(':')[0]) : Number(timezone.split('-')[1].split(':')[0]);
        }
        
        dateSunrise.setHours(utcSunriseHours);
        dateSunrise.setMinutes(utcSunriseMinutes);
        dateSunrise.setSeconds(Number(result.results.sunrise.split(':')[2].substr(0,2)));
        dateSunset.setHours(utcSunsetHours);
        dateSunset.setMinutes(utcSunsetMinutes);
        dateSunset.setSeconds(Number(result.results.sunset.split(':')[2].substr(0,2)));
        this.currentDate.setHours(utcCurrentHours + this.currentDate.getHours()-2);
        this.currentDate.setMinutes(utcCurrentMinutes + this.currentDate.getMinutes());
        this.sunrise = dateSunrise;
        this.sunset = dateSunset;
      },
      error => {
        console.log(error);
      }
    )
  }

  runCurrentTime(date: Date)
  {
    interval(1000).subscribe(x => 
    {
      this.currentDate = date; 
      this.currentDate.setSeconds(1 + this.currentDate.getSeconds());
      console.log(this.currentDate);
    });
  }

  ngOnDestroy()
  {
    this.subscriptionWeather.unsubscribe();
    this.subscriptionSunSetRise.unsubscribe();
  }
}