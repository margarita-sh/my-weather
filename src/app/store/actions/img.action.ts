import { createAction, props } from '@ngrx/store';
import { ActionCreator, NotAllowedCheck, TypedAction } from '@ngrx/store/src/models';
import {  Action } from '@ngrx/store';

type TypeActionCreator<S extends string, O extends object> = ActionCreator<
	S, (props: O & NotAllowedCheck<O>) => & TypedAction<S>
>;

export interface CustomImgAction extends Action {
   srcImg: string;

}
export const getImgFromAPI: TypeActionCreator <string, {}> = createAction(
	'[IMG] get img from API',
  );

export const setBackgroundImgFromAPI: TypeActionCreator <string, {srcImg: string}> = createAction(
	'[GEO] set backgroundImg from API',
	props<{srcImg: string}>()
  );
