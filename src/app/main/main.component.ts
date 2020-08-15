import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { WeatherService } from './service/api.weather.service';
import { FormGroup, FormControl } from '@angular/forms';
import { GeolocationService } from './service/geolocation.service';
import { Subscription } from 'rxjs';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { MapsComponent } from '../maps/maps.component';

@Component({
	selector: 'app-main',
	templateUrl: './main.component.html',
	styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {
	@ViewChild(MapsComponent, {static: false})
	private mapsComponent: MapsComponent;
	public loading: boolean = false;
	public mode: ProgressSpinnerMode = 'indeterminate';
	public strokeWidth: number = 10;
	public diameter: number = 100;
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
	public time: Date = new Date();
	public countryInput: string = '';

	constructor(private http: WeatherService, private geo: GeolocationService) {
		this.myForm = new FormGroup({
			country: new FormControl(),
		});
	}
	public ngOnDestroy(): void {
		  this.subscription.unsubscribe();
	  }

	public ngOnInit(): void {
	  this.loading = true;
	  this.subscription	=  this.geo.locationData().subscribe((item: any) => {
			this.country = item;
			this.loadData();
			this.loading = false;
	   });

	}

	public onCitySubmit(): void {
		this.country = this.countryInput;
		this.loadData();
		this.geo.loadCoord(this.country).subscribe((item: any) =>  this.mapsComponent.setMarker(item));
	}

	public loadData(): void {
			this.http.loadWeather(this.country).subscribe((item: any) => {
			this.temperature = item.temperature;
			this.feelsTemp = item.feelsTemp;
			this.minTemp = item.minTemp;
			this.maxTemp = item.maxTemp;
			this.pressure = item.pressure;
			this.humidity = item.humidity ;
			this.visibility = item.visibility;
			this.speed = item.speed;
			// tslint:disable-next-line: no-magic-numbers
			this.sunrise = new Date(item.sunrise * 1000).toLocaleTimeString();
			// tslint:disable-next-line: no-magic-numbers
			this.sunset = new Date(item.sunset * 1000).toLocaleTimeString();
		});
	}

}
