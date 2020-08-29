import { Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import { WeatherService } from './service/api.weather.service';
import { FormGroup, FormControl } from '@angular/forms';
import { GeolocationService } from './service/geolocation.service';
import { Subscription, Observable } from 'rxjs';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { MapsComponent } from '../maps/maps.component';
import { ImgService } from './service/img.service';
import { Store, select } from '@ngrx/store';
import { getDataFromBrowserAPI, getDataFromYandexAPI, updateTime } from '../store/actions/geo.action';
import { selectCity, selectWeather, selectTime } from '../store/selectors/geo.selectors';
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
	public location: string;
	public subscription: Subscription;
	//public time: Date = new Date();
	public srcImg: string = '';
	public arrayCoordFromInput: any;
	public city$: Observable<string> = this._store$.pipe(select(selectCity));
	public srcImg$: Observable<string> = this._store$.pipe(select(selectSrcImg));
	public weather$: Observable<string> = this._store$.pipe(select(selectWeather));
	public selectTime$: Observable<string> = this._store$.pipe(select(selectTime));

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
		this.subscription = this.city$.subscribe((item: any) => {
			if (!item) {
				return;
			}
			this.loadData(item);
			this.loading = false;
			this._store$.dispatch(updateTime({}));
		});
	}

	public onCitySubmit(cityInput: string): void {
		this._store$.dispatch(getDataFromYandexAPI({cityInput}));
		 this.geo.loadCoordFromInput(cityInput).subscribe((item: any) => {
			this.mapsComponent.setMarker(item.coords);
		});
	}

	public loadData(cityInput: string): void {
		this._store$.dispatch(getDataFromYandexAPI({cityInput}));
	}

}
