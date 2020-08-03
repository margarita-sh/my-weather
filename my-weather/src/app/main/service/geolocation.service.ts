import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, Subject, Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';


@Injectable()
export class GeolocationService {
	private myKey: string = 'abc41fbc-7058-428f-a054-f484c95cf718';
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
		const a = `https://geocode-maps.yandex.ru/1.x/?format=json&apikey=${this.myKey}&geocode=${coord}`;
		console.log(a, 'a');
		return this.httpClient.get(`https://geocode-maps.yandex.ru/1.x/?format=json&apikey=${this.myKey}&geocode=${coord}`).pipe(
			// tslint:disable-next-line: typedef
			map((data: any) => {
				console.log('data', data);
				console.log('data.FILTER', data.response.GeoObjectCollection.featureMember.map((item: any) => item.GeoObject));
				const arrayData: Array<{}> = data.response.GeoObjectCollection.featureMember.map((item: any) => item.GeoObject);
				console.log('arrayData', arrayData);
				const xxx: any = arrayData.find((item: any) => item.metaDataProperty.GeocoderMetaData.kind === 'locality');
				if (xxx) {
					return xxx.name;
				} else {
					return '';
				}
			})
		);
	}
}
