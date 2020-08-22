export interface GeoState {
city: string;
cityInput: string;
data: {
	coords: [],
	town: string
};

}

export const featureKeyGeoLocation: 'GEOLOCATION' = 'GEOLOCATION';

export const initialState: GeoState = {
city: '',
cityInput: '',
data: {
	coords: [],
	town: ''
}
};
