import { Injectable } from '@angular/core';
import { ofType, createEffect, Actions } from '@ngrx/effects';
import { mergeMap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { TypedAction } from '@ngrx/store/src/models';
import { ImgService } from '../../main/service/img.service';
import { getImgFromAPI, setBackgroundImgFromAPI } from '../actions/img.action';

@Injectable()
export class ImgEffects {
	public setBackgroundImg$: Observable<TypedAction<string>> = createEffect(
		() => this.actions$.pipe(
			ofType(getImgFromAPI),
			mergeMap(() => this.imgService.loadImg()
				.pipe(
					map((srcImg: string) => {
						console.log('sssss', srcImg);
						return setBackgroundImgFromAPI({srcImg});
					})
				)
			)
		)
	);

	constructor(
		private actions$: Actions,
		private imgService: ImgService
	) { }
	}
