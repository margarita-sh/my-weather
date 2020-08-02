import { Component, OnInit } from '@angular/core';
import { WeatherService } from './service/api.weather.service';
import { FormGroup, FormControl } from '@angular/forms';
import { GeolocationService } from './service/geolocation.service';

@Component({
	selector: 'app-main',
	templateUrl: './main.component.html',
	styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
	public myForm: FormGroup;
	public country: string;
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

	constructor(private http: WeatherService, private geo: GeolocationService) {
		this.myForm = new FormGroup({
			country: new FormControl(),
		});
	}

	public ngOnInit(): void {
		this.geo.getLocation();
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
