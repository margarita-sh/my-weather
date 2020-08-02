import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { WeatherService } from './main/service/api.weather.service';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { GeolocationService } from './main/service/geolocation.service';

@NgModule({
	declarations: [
		AppComponent,
		MainComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		ReactiveFormsModule,
		HttpClientModule
	],
	providers: [WeatherService, GeolocationService],
	bootstrap: [AppComponent]
})
export class AppModule { }
