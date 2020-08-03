// tslint:disable-next-line: no-namespace
export namespace ModelGeolocation {

	export interface Point {
		pos: string;
	}

	export interface GeocoderResponseMetaData {
		Point: Point;
		request: string;
		results: string;
		found: string;
	}

	export interface MetaDataProperty {
		GeocoderResponseMetaData: GeocoderResponseMetaData;
	}

	export interface Component {
		kind: string;
		name: string;
	}

	export interface Address {
		country_code: string;
		formatted: string;
		Components: Component[];
	}

	export interface Thoroughfare {
		ThoroughfareName: string;
	}

	export interface DependentLocality2 {
		DependentLocalityName: string;
	}

	export interface DependentLocality {
		DependentLocalityName: string;
		DependentLocality: DependentLocality2;
	}

	export interface Locality {
		LocalityName: string;
		Thoroughfare: Thoroughfare;
		DependentLocality: DependentLocality;
	}

	export interface SubAdministrativeArea {
		SubAdministrativeAreaName: string;
	}

	export interface AdministrativeArea {
		AdministrativeAreaName: string;
		Locality: Locality;
		SubAdministrativeArea: SubAdministrativeArea;
	}

	export interface Country {
		AddressLine: string;
		CountryNameCode: string;
		CountryName: string;
		AdministrativeArea: AdministrativeArea;
	}

	export interface AddressDetails {
		Country: Country;
	}

	export interface GeocoderMetaData {
		precision: string;
		text: string;
		kind: string;
		Address: Address;
		AddressDetails: AddressDetails;
	}

	export interface MetaDataProperty2 {
		GeocoderMetaData: GeocoderMetaData;
	}

	export interface Envelope {
		lowerCorner: string;
		upperCorner: string;
	}

	export interface BoundedBy {
		Envelope: Envelope;
	}

	export interface Point2 {
		pos: string;
	}

	export interface GeoObject {
		metaDataProperty: MetaDataProperty2;
		name: string;
		description: string;
		boundedBy: BoundedBy;
		Point: Point2;
	}

	export interface FeatureMember {
		GeoObject: GeoObject;
	}

	export interface GeoObjectCollection {
		metaDataProperty: MetaDataProperty;
		featureMember: FeatureMember[];
	}

	export interface Response {
		GeoObjectCollection: GeoObjectCollection;
	}

	export interface RootObject {
		response: Response;
	}

}
