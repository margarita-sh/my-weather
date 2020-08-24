import { ActionReducerMap } from '@ngrx/store';
import { featureKeyGeoLocation, GeoState } from './state/geo.state';
import { StateReducerGeo } from './reducer/geo.reducer';
import { featureKeySrcImg, ImgState } from './state/img.state';
import { StateReducerSrcImg } from './reducer/img.reducer';

export interface IAppState {
	[featureKeyGeoLocation]: GeoState;
	[featureKeySrcImg]: ImgState;
}

export const reducer: ActionReducerMap<IAppState> = {
	[featureKeyGeoLocation]: StateReducerGeo,
	[featureKeySrcImg]: StateReducerSrcImg,
};
