import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { ConnectApiService } from 'src/app/services/connect-api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { apiResponse } from 'src/app/model/apiResponse';
import { Subscription } from 'rxjs';

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
  public apiResponse: apiResponse[][];
  public name: string;
  public temp: number;
  public description: string;

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
        (result: apiResponse[]) =>
        {
          console.log(result);
          
          for(let i in result)
          {
            // console.log(i + ' - ' + result[i]);
            if(i === 'name')
            {
              this.name = String(result[i]);
            }
            // if(i === 'temp')
            // this.temp = Number(result[i]);
            // this.cityInput = this.apiResponse.name;
            let apiResult = result[i];
            if(typeof result[i] === 'object')
            {
              for(let j in apiResult)
              {
                console.log(j + ' - ' + apiResult[j]);
              }
            }
          }
        },
        (error) =>
        {
          console.log(error.status);
          this.apiConnect = error.status;
        }
      )
    }
  }

  ngOnDestroy()
  {
    this.subscription.unsubscribe();
  }
}
