import { Injectable } from '@angular/core';
import { ofType, createEffect, Actions } from '@ngrx/effects';
import { mergeMap, map, withLatestFrom, concatMap } from 'rxjs/operators';
import { Observable, of, interval, } from 'rxjs';
import { TypedAction } from '@ngrx/store/src/models';
import { GeolocationService } from '../../main/service/geolocation.service';
import { getDataFromBrowserAPI, setCityFromBrowserAPI, getDataFromYandexAPI, CustomGeoAction, setDataFromYandexAPI, updateTime, setTime } from '../actions/geo.action';
import { WeatherService } from '../../main/service/api.weather.service';
import { selectWeather } from '../selectors/geo.selectors';
import { Store, select } from '@ngrx/store';
import { TimeService } from '../../main/service/time.service';

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
						return data;
					}),
					mergeMap((data: any) => this.weatherService.loadWeather(data.coords[0], data.coords[1])
						.pipe(
							map((weather: any) => {
								return setDataFromYandexAPI({ data, weather });
							})
						)
					)
				)
			)
		)
	);

	public updateLocalTime$: Observable<TypedAction<string>> = createEffect(
		() => this.actions$.pipe(
			ofType(updateTime),
			mergeMap((action: any) => of(action).pipe(
				withLatestFrom(this._store$.pipe(select(selectWeather)))
			  )
				.pipe(
					map((data: any) => {
						return data[1].timezone;
					}),
					mergeMap((data: any) => of(this.timeService.getCuttentTime(data))
						.pipe(
							map((time: any) => {
								return setTime({ time });
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
		private weatherService: WeatherService,
		private _store$: Store,
		private timeService: TimeService
	) { }
}
