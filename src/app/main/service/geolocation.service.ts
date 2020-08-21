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

// браузер выдает координаты
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

// получение название города по координатам браузера
	public locationData(): Observable<any> {
		return this.getLocation().pipe(
			switchMap((coord: string) => {
				console.log('coord', coord);
				return this.loadLocation(coord);
			})
		);
	}

// название города по координатам
	public loadLocation(coord: string): Observable<ModelGeolocation.RootObject> {
		const url: string = `https://geocode-maps.yandex.ru/1.x/?format=json&apikey=${this.myKey}&geocode=${coord}`;
		return this.httpClient.get(url).pipe(
			map((data: ModelGeolocation.RootObject) => {
				const arrayData: ModelGeolocation.GeoObject[] = data.response.GeoObjectCollection.featureMember.map((item: any) => item.GeoObject);
				this.position = arrayData[0].Point.pos.split(' ');
				const cityName: any = arrayData.find((item: any) => {
					const kind: string = item.metaDataProperty.GeocoderMetaData.kind;
					 return kind === 'locality'  || kind === 'area';
				});
				if (cityName) {
					return cityName.name;
				} else {
					return '';
				}
			})
		);
	}
// по названию города из инпута выдает координаты, чтобы показывать корректно погоду
	public loadCoordFromInput(cityInput: string): Observable<any> {
		// tslint:disable-next-line: typedef
		const url = `https://geocode-maps.yandex.ru/1.x/?format=json&apikey=${this.myKey}&geocode=${cityInput}`;
		return this.httpClient.get(url).pipe(
			map((data: ModelGeolocation.RootObject) => {
				const arrayData: ModelGeolocation.GeoObject[] = data.response.GeoObjectCollection.featureMember.map((item: any) => {
					return item.GeoObject;
				});
				const cityName: any = arrayData.find((i: any) => {
					const kind: string = i.metaDataProperty.GeocoderMetaData.kind;
					 return kind === 'locality'  || kind === 'area';
				});
				return {
					coords: arrayData[0].Point.pos.split(' ').reverse(),
					town: cityName.name
				};
			})
		);
	}
}
