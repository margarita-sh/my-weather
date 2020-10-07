import { createFeatureSelector, createSelector} from '@ngrx/store';
import { GeoState, featureKeyGeoLocation } from '../state/geo.state';

export const selectGeoFeature: any = createFeatureSelector<GeoState>(featureKeyGeoLocation);

export const selectCity: any = createSelector(
	selectGeoFeature,
	(state: GeoState): string => state.city
);

export const selectWeather: any = createSelector(
	selectGeoFeature,
	(state: GeoState) => state.weather
);

  export const selectTime: any = createSelector(
	selectGeoFeature,
	(state: GeoState) => state.time
);
