import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { WeatherDialogComponent } from './weather-dialog/weather-dialog.component';
import { SearchWeatherComponent } from './weather-dialog/search-weather/search-weather.component';
import { WeatherResultComponent } from './weather-dialog/weather-result/weather-result.component';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [
    AppComponent,
    WeatherDialogComponent,
    SearchWeatherComponent,
    WeatherResultComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatSnackBarModule,
    MatFormFieldModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
