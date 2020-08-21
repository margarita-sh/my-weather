import { createFeatureSelector, createSelector} from '@ngrx/store';
import { GeoState, featureKeyGeoLocation } from '../state/geo.state';

export const selectGeoFeature: any = createFeatureSelector<GeoState>(featureKeyGeoLocation);
export const selectCity: any = createSelector(
	selectGeoFeature,
	(state: GeoState): string => state.city
);
