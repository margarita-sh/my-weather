import { ModelAPI } from './model.api';

export class WeatherData {
	public conversionDegrees: number = 273.15;
	public conversionPressure: number = 0.7519;
	public temperature: number;
	public feelsTemp: number;
	public minTemp: number;
	public maxTemp: number;
	public pressure: number;
	public humidity: number;
	public visibility: number;
	public speed: number;
	public sunrise: number;
	public sunset: number;

	public parseModel(data: ModelAPI.WeatherAPI): void {
		this.temperature = Math.round(data.main.temp - this.conversionDegrees);
		this.feelsTemp =  Math.round(data.main.feels_like - this.conversionDegrees);
		this.minTemp =  Math.round(data.main.temp_min - this.conversionDegrees);
		this.maxTemp =  Math.round(data.main.temp_max - this.conversionDegrees);
		this.pressure = Math.round( data.main.pressure * this.conversionPressure);
		this.humidity =  data.main.humidity;
		this.visibility = data.visibility;
		this.speed = data.wind.speed;
		this.sunrise = data.sys.sunrise;
		this.sunset = data.sys.sunset;

	}
}
