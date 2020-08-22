import { Injectable } from '@angular/core';
import { ofType, createEffect, Actions } from '@ngrx/effects';
import { mergeMap, map } from 'rxjs/operators';
import { Observable, of, } from 'rxjs';
import { TypedAction } from '@ngrx/store/src/models';
import { GeolocationService } from '../../main/service/geolocation.service';
import { getDataFromBrowserAPI, setCityFromBrowserAPI, getDataFromYandexAPI, CustomGeoAction, setCityFromYandexAPI } from '../actions/geo.action';

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
					/* 	const city: string = data.town; */
						return setCityFromYandexAPI({data});
					})
				)
			)
		)
	);
/*
	public getProfileUserFromLS$: Observable<TypedAction<string>> = createEffect(
		() => this.actions$.pipe(
			ofType(getProfileUserFromLS),
			mergeMap(() => of(this.profileService.getProfileFromLS())
				.pipe(
					map((profile: Profile) => {
						return setProfileUser({ profile });
					})
				)
			)
		)
	); */

	constructor(
		private actions$: Actions,
		private geoService: GeolocationService
	) { }
}
