import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';


@Injectable()
export class GeolocationService {
	private myKey: string = 'abc41fbc-7058-428f-a054-f484c95cf718';
	public position:any;
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

	public locationData(): Observable<string> {
		return this.getLocation().pipe(
			switchMap((coord: string) => {
				return this.loadLocation(coord);
			})
		);
	}

	public loadLocation(coord: string): Observable<any> {
		// tslint:disable-next-line: typedef
		const url = `https://geocode-maps.yandex.ru/1.x/?format=json&apikey=${this.myKey}&geocode=${coord}`;
		return this.httpClient.get(url).pipe(
			// tslint:disable-next-line: typedef
			map((data: any) => {
				const arrayData: Array<{}> = data.response.GeoObjectCollection.featureMember.map((item: any) => item.GeoObject);
				console.log('arrayData', arrayData);
					this.position = arrayData[0].Point.pos.split(' ');
				console.log('this.position', this.position);
				const cityName: any = arrayData.find((item: any) => item.metaDataProperty.GeocoderMetaData.kind === 'locality');
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
			map((data: any) => {
				const arrayData: Array<{}> = data.response.GeoObjectCollection.featureMember.map((item: any) => item.GeoObject);
				console.log('arrayData', arrayData);
				return arrayData[0].Point.pos.split(' ').reverse();
			})
		);
	}
}
