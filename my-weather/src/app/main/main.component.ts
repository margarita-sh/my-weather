import { Component, OnInit } from '@angular/core';
import { WeatherService } from './service/api.weather.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
	selector: 'app-main',
	templateUrl: './main.component.html',
	styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
	public myForm: FormGroup;
	public country: string;

	constructor(private http: WeatherService) {
		this.myForm = new FormGroup({
			country: new FormControl(),
		});
	}

	public ngOnInit(): void {
		/* this.http.loadWeather(this.country).subscribe((item: object) => item);
		console.log(this.http.loadWeather(this.country).subscribe((item: object) => item));
		console.log('ssss'); */
	}

	public loadData(): void {
		this.http.loadWeather(this.country).subscribe((item: any) => console.log(item));
	}
}
