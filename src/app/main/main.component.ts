import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { WeatherService } from './service/api.weather.service';
import { FormGroup, FormControl } from '@angular/forms';
import { GeolocationService } from './service/geolocation.service';
import { Subscription, Observable } from 'rxjs';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { MapsComponent } from '../maps/maps.component';
import { ImgService } from './service/img.service';
import { Store, select } from '@ngrx/store';
import { getDataFromBrowserAPI, getDataFromYandexAPI } from '../store/actions/geo.action';
import { selectCity, selectCityInput } from '../store/selectors/geo.selectors';
import { getImgFromAPI } from '../store/actions/img.action';
import { selectSrcImg } from '../store/selectors/img.selectors';
import { map } from 'leaflet';

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
/* 	public cityInput: string = ''; */
	public srcImg: string = '';
	public arrayCoordFromInput: any;
	public city$: Observable<string> = this._store$.pipe(select(selectCity));
	public srcImg$: Observable<string> = this._store$.pipe(select(selectSrcImg));
 	//public xxx$: Observable<any> = this._store$.pipe(select(selectCityInput));


	constructor(private http: WeatherService, private geo: GeolocationService, private linkImg: ImgService, private _store$: Store) {
		this.myForm = new FormGroup({
			cityInput: new FormControl(),
		});
	}
	public ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

	public ngOnInit(): void {
		this._store$.dispatch(getDataFromBrowserAPI({}));
		this._store$.dispatch(getImgFromAPI({}));
		this.loading = true;
	//	this.linkImg.loadImg().subscribe((data: any) => this.srcImg = data);
		this.subscription = this.city$.subscribe((item: any) => {
			if (!item) {
				return;
			}
			this.loadData(item);
			this.loading = false;
		});
	}

	public onCitySubmit(cityInput: string): void {
		this._store$.dispatch(getDataFromYandexAPI({cityInput}));
/* 			this.city$ = this.xxx$; */
		/* this.xxx = this._store$.pipe(select(selectCityInput)); */
		 this.geo.loadCoordFromInput(cityInput).subscribe((item: any) => {
			this.mapsComponent.setMarker(item.coords);
			 /*this.city = item.town;
			 this.loadData(this.cityInput);*/
		});
	}

	public loadData(city: string): void {
		this.geo.loadCoordFromInput(city).subscribe((data: any) => {
			this.arrayCoordFromInput = data.coords;
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
