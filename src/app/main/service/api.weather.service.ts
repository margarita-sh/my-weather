import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { WeatherData } from '../model/model.weather';
import { ModelAPI } from '../model/model.api';
@Injectable()
export class WeatherService {
	private myKey: string = '5211abf32aeba9a166b91f5e2bba0e49';
	private url: string = 'api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={your api key}';
	private xxx: string = 'api.openweathermap.org/data/2.5/weather?lat=52.094246&lon=23.684559&appid=5211abf32aeba9a166b91f5e2bba0e49';
	public constructor(private httpClient: HttpClient) { }

/* 	public loadWeather(country: string): Observable<any> {
		return this.httpClient.get(`https://api.openweathermap.org/data/2.5/weather?q=${country}&appid=${this.myKey}`).pipe(
			map((data: ModelAPI.WeatherAPI) => {
				const weatherData: WeatherData = new WeatherData();
				weatherData.parseModel(data);
				return weatherData;
			})
		);
	} */

	public loadWeather(lat: any, lon: any): Observable<any> {
		return this.httpClient.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${this.myKey}`).pipe(
			map((data: ModelAPI.WeatherAPI) => {
				const weatherData: WeatherData = new WeatherData();
				weatherData.parseModel(data);
				return weatherData;
			})
		);
	}
}
