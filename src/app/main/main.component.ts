import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { WeatherService } from './service/api.weather.service';
import { FormGroup, FormControl } from '@angular/forms';
import { GeolocationService } from './service/geolocation.service';
import { Subscription } from 'rxjs';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { MapsComponent } from '../maps/maps.component';
import { ImgService } from './service/img.service';

@Component({
	selector: 'app-main',
	templateUrl: './main.component.html',
	styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {
	@ViewChild(MapsComponent, { static: false })
	private mapsComponent: MapsComponent;
	public loading: boolean = false;
	public mode: ProgressSpinnerMode = 'indeterminate';
	public strokeWidth: number = 10;
	public diameter: number = 100;
	public myForm: FormGroup;
	public city: any;
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
	public cityInput: string = '';
	public srcImg: string = '';
	public arrayCoordFromInput: any;

	constructor(private http: WeatherService, private geo: GeolocationService, private linkImg: ImgService) {
		this.myForm = new FormGroup({
			cityInput: new FormControl(),
		});
	}
	public ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

	public ngOnInit(): void {
		this.loading = true;
		this.linkImg.loadImg().subscribe((data: any) => this.srcImg = data);
		this.subscription = this.geo.locationData().subscribe((item: any) => {
			this.city = item;
			this.loadData();
			this.loading = false;
		});

	}

	public onCitySubmit(): void {
	/* 	this.city = this.cityInput; */
/* 	this.city ='...'; */
		this.loadData();
		this.geo.loadCoordFromInput(this.cityInput).subscribe((item: any) => {
			this.mapsComponent.setMarker(item.coords);
			this.city = item.town;
		});
	}

	public loadData(): void {
		this.geo.loadCoordFromInput(this.city).subscribe((data: any) => {
			this.arrayCoordFromInput = data.coords;
			console.log('data OBJECT', data);
			const lat: any = this.arrayCoordFromInput[0];
			const lon: any = this.arrayCoordFromInput[1];
			this.http.loadWeather(lat, lon).subscribe((item: any) => {
				this.temperature = item.temperature;
				this.feelsTemp = item.feelsTemp;
				this.minTemp = item.minTemp;
				this.maxTemp = item.maxTemp;
				this.pressure = item.pressure;
				this.humidity = item.humidity;
				this.visibility = item.visibility;
				this.sunrise = new Date(item.sunrise * 1000).toLocaleTimeString();
				this.sunset = new Date(item.sunset * 1000).toLocaleTimeString();
			});
		});

	}

}
