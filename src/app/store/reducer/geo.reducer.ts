import { createReducer, on, Action, ActionReducer } from '@ngrx/store';
import * as GeoAction from '../actions/geo.action';
import { GeoState, initialState } from '../state/geo.state';

export const geoReducer: ActionReducer<GeoState, Action> = createReducer(
	initialState,
 	on(GeoAction.setCityFromBrowserAPI, (state: GeoState, action: GeoAction.CustomGeoAction): GeoState => {
		return ({
			...state,
			city: action.city
		});
	}),

 	on(GeoAction.setDataFromYandexAPI, (state: GeoState, action: GeoAction.CustomGeoAction): GeoState => {
		return ({
			...state,
			city: action.data.town,
			weather: action.weather
		});
	})
);

export function StateReducerGeo(state: GeoState | undefined, action: Action): GeoState {
	return geoReducer(state, action);
}
