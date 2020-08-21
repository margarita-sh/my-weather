import { createAction, props } from '@ngrx/store';
import { ActionCreator, NotAllowedCheck, TypedAction } from '@ngrx/store/src/models';
import {  Action } from '@ngrx/store';

type TypeActionCreator<S extends string, O extends object> = ActionCreator<
	S, (props: O & NotAllowedCheck<O>) => & TypedAction<S>
>;

export interface CustomGeoAction extends Action {
	city: string;

}
export const getDataFromBrowserAPI: TypeActionCreator <string, {}> = createAction(
	'[GEO] get data from Browser API',
  );

export const setCityFromBrowserAPI: TypeActionCreator <string, {}> = createAction(
	'[GEO] set city from Browser coords API',
	props<{city: string}>()
  );
