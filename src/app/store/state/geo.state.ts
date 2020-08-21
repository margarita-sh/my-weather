export interface GeoState {
city: string;
}

export const featureKeyGeoLocation: 'GEOLOCATION' = 'GEOLOCATION';

export const initialState: GeoState = {
city: '',
};
