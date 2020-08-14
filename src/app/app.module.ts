import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { WeatherService } from './main/service/api.weather.service';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { GeolocationService } from './main/service/geolocation.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import { MapsComponent } from './maps/maps.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@NgModule({
	declarations: [
		AppComponent,
		MainComponent,
		MapsComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		ReactiveFormsModule,
		HttpClientModule,
		BrowserAnimationsModule,
		MatInputModule,
		MatIconModule,
		MatProgressSpinnerModule,
	],
	providers: [WeatherService, GeolocationService],
	bootstrap: [AppComponent]
})
export class AppModule { }
