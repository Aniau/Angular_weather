import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ConnectApiService } from 'src/app/services/connect-api.service';

@Component({
  selector: 'app-search-weather',
  templateUrl: './search-weather.component.html',
  styleUrls: ['./search-weather.component.css']
})
export class SearchWeatherComponent implements OnInit
{
  @Output() emitCity = new EventEmitter<string>();
  public city = '';
  constructor(private apiConnect: ConnectApiService)
  {}

  ngOnInit(): void {
  }

  searchCity(city: string)
  {
    this.emitCity.emit(city);
  }
}
