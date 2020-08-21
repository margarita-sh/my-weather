import { ActionReducerMap } from '@ngrx/store';
import { featureKeyGeoLocation, GeoState } from './state/geo.state';
import { StateReducerGeo } from './reducer/geo.reducer';

export interface IAppState {
[featureKeyGeoLocation]: GeoState;
}

export const reducer: ActionReducerMap<IAppState> = {
[featureKeyGeoLocation]: StateReducerGeo,
};
