import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
/* import { MetaDataProperty, GeocoderResponseMetaData } from '../model/model.geolocation'; */
import { ModelGeolocation } from '../model/model.geolocation';

@Injectable()
export class GeolocationService {
	private myKey: string = 'abc41fbc-7058-428f-a054-f484c95cf718';
	public position: any;
	public constructor(private httpClient: HttpClient) { }

	public getLocation(): Observable<any> {
		const sendResult: any = new Subject<string>();

		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition((position: any) => {
				sendResult.next(`${position.coords.longitude},${position.coords.latitude}`);
			});
		} else {
			sendResult.error('error');
		}

		return sendResult.asObservable();
	}

	public locationData(): Observable<any> {
		return this.getLocation().pipe(
			switchMap((coord: string) => {
				return this.loadLocation(coord);
			})
		);
	}

	public loadLocation(coord: string): Observable<ModelGeolocation.RootObject> {
		const url: string = `https://geocode-maps.yandex.ru/1.x/?format=json&apikey=${this.myKey}&geocode=${coord}`;
		return this.httpClient.get(url).pipe(
			map((data: ModelGeolocation.RootObject) => {
				const arrayData: ModelGeolocation.GeoObject[] = data.response.GeoObjectCollection.featureMember.map((item: any) => item.GeoObject);
				this.position = arrayData[0].Point.pos.split(' ');
				const cityName: any = arrayData.find((item: any) => {
					const kind: string = item.metaDataProperty.GeocoderMetaData.kind;
					 return kind === 'locality'  || kind === 'country';
				});
				if (cityName) {
					return cityName.name;
				} else {
					return '';
				}
			})
		);
	}

	public loadCoord(cityInput: string): Observable<any> {
		// tslint:disable-next-line: typedef
		const url = `https://geocode-maps.yandex.ru/1.x/?format=json&apikey=${this.myKey}&geocode=${cityInput}`;
		return this.httpClient.get(url).pipe(
			map((data: ModelGeolocation.RootObject) => {
				const arrayData: ModelGeolocation.GeoObject[] = data.response.GeoObjectCollection.featureMember.map((item: any) => item.GeoObject);
				return arrayData[0].Point.pos.split(' ').reverse();
			})
		);
	}
}
