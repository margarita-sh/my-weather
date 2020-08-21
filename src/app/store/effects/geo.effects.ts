import { Injectable } from '@angular/core';
import { ofType, createEffect, Actions } from '@ngrx/effects';
import { mergeMap, map } from 'rxjs/operators';
import { Observable, of, } from 'rxjs';
import { TypedAction } from '@ngrx/store/src/models';
import { GeolocationService } from '../../main/service/geolocation.service';
import { getDataFromBrowserAPI, setCityFromBrowserAPI } from '../actions/geo.action';

@Injectable()
export class GeoEffects {
	public getDataFromBrowserAPI$: Observable<TypedAction<string>> = createEffect(
		() => this.actions$.pipe(
			ofType(getDataFromBrowserAPI),
			mergeMap(() => this.geoService.locationData()
				.pipe(
					map((city: any) => {
						console.log('effect', city);
						return setCityFromBrowserAPI({ city });
					})
				)
			)
		)
	);
	/* public saveProfileUser$: Observable<TypedAction<string>> = createEffect(
		() => this.actions$.pipe(
			ofType(saveProfileUser),
			mergeMap((action: CustomAction) => of(this.profileService.saveProfile(action.profile.nickname, action.profile.id))
				.pipe(
					map(() => {
						return getProfileUserFromLS({});
					})
				)
			)
		)
	);

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
