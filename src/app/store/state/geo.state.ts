export interface GeoState {
	city: string;
	cityInput: string;
	time: string;
	data: {
		coords: [],
		town: string
	};
	weather: {
		temperature: number,
		feelsTemp: number,
		minTemp: number,
		maxTemp: number,
		pressure: number,
		humidity: number,
		visibility: number,
		sunrise: number,
		sunset: number,
		timezone: number
	};

}

export const featureKeyGeoLocation: 'GEOLOCATION' = 'GEOLOCATION';

export const initialState: GeoState = {
	city: '',
	cityInput: '',
	data: {
		coords: [],
		town: ''
	},
	weather: {
		temperature: null,
		feelsTemp: null,
		minTemp: null,
		maxTemp: null,
		pressure: null,
		humidity: null,
		visibility: null,
		sunrise: null,
		sunset: null,
		timezone: null
	},
	time: '',
};
