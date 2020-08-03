import { Component, OnInit, OnDestroy } from '@angular/core';
import { WeatherService } from './service/api.weather.service';
import { FormGroup, FormControl } from '@angular/forms';
import { GeolocationService } from './service/geolocation.service';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-main',
	templateUrl: './main.component.html',
	styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {
	public myForm: FormGroup;
	public country: any;
	public temperature: number;
	public feelsTemp: number;
	public minTemp: number;
	public maxTemp: number;
	public pressure: number;
	public humidity: number;
	public visibility: number;
	public speed: number;
	public sunrise: string;
	public sunset: string;
	public location: string; 
	public subscription: Subscription;

	constructor(private http: WeatherService, private geo: GeolocationService) {
		this.myForm = new FormGroup({
			country: new FormControl(),
		});
	}
	public ngOnDestroy(): void {
		  this.subscription.unsubscribe();
	  }

	public ngOnInit(): void {
	  this.subscription	=  this.geo.locationData().subscribe((item: any) => {
			this.country = item;
			this.loadData();
	   });

	}

	public loadData(): void {
		const aaa = this.http.loadWeather(this.country).subscribe((item: any) => {
			this.temperature = item.temperature;
			this.feelsTemp = item.feelsTemp;
			this.minTemp = item.minTemp;
			this.maxTemp = item.maxTemp;
			this.pressure = item.pressure;
			this.humidity = item.humidity ;
			this.visibility = item.visibility;
			this.speed = item.speed;
			this.sunrise = new Date(item.sunrise * 1000).toLocaleTimeString();
			this.sunset = new Date(item.sunset * 1000).toLocaleTimeString();
		});
	}

}
