import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { apiResponse } from '../model/apiResponse';
import { sunResult } from '../model/sunRiseSet';

@Injectable({
  providedIn: 'root'
})
export class ConnectApiService {
  private apiLink = 'http://api.openweathermap.org/data/2.5/weather?q=';
  private params = '&appid=64f97c5359809775e89b868b96443f95&units=metric';

  constructor(private http: HttpClient) { }

  getWeather(city: string): Observable<apiResponse>
  {
    return this.http.get<apiResponse>(this.apiLink + city + this.params);
  }

  getSun(lat: number, lng: number): Observable<sunResult>
  {
    return this.http.get<sunResult>('https://api.sunrise-sunset.org/json?lat=' + lat + '&lng=' + lng);
  }
  // private handleError(error: HttpErrorResponse): Observable<never>
  // {
  //   return throwError(`error: ${error}`); 
  // }
}
