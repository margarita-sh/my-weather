import { Injectable } from '@angular/core';
import { ofType, createEffect, Actions } from '@ngrx/effects';
import { mergeMap, map } from 'rxjs/operators';
import { Observable, of, } from 'rxjs';
import { TypedAction } from '@ngrx/store/src/models';
import { GeolocationService } from '../../main/service/geolocation.service';
import { getDataFromBrowserAPI, setCityFromBrowserAPI, getDataFromYandexAPI, CustomGeoAction, setDataFromYandexAPI } from '../actions/geo.action';
import { WeatherService } from '../../main/service/api.weather.service';

@Injectable()
export class GeoEffects {
	public setCityFromBrowserAPI$: Observable<TypedAction<string>> = createEffect(
		() => this.actions$.pipe(
			ofType(getDataFromBrowserAPI),
			mergeMap(() => this.geoService.locationData()
				.pipe(
					map((city: any) => {
						return setCityFromBrowserAPI({ city });
					})
				)
			)
		)
	);
	public setCityFromInput$: Observable<TypedAction<string>> = createEffect(
		() => this.actions$.pipe(
			ofType(getDataFromYandexAPI),
			mergeMap((action: CustomGeoAction) => this.geoService.loadCoordFromInput(action.cityInput)
				.pipe(
					map((data: any) => {
						console.log('data EFFECT', data);
						return data;
					}),
					mergeMap((data: any) => this.weatherService.loadWeather(data.coords[0], data.coords[1])
						.pipe(
							map((weather: any) => {
								console.log('data EFFECT 222', weather);
								return setDataFromYandexAPI({ data, weather });
							})
						)
					)
				)
			)
		)
	);

	constructor(
		private actions$: Actions,
		private geoService: GeolocationService,
		private weatherService: WeatherService
	) { }
}
