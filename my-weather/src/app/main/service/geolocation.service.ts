import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class GeolocationService {
private myKey: string = 'abc41fbc-7058-428f-a054-f484c95cf718';

public x: string;

/* public constructor(private httpClient: HttpClient) { } */
public getLocation(): void {
  if (navigator.geolocation) {
	navigator.geolocation.getCurrentPosition(this.showPosition);
  } else {
	this.x = 'Geolocation is not supported by this browser.';
  }
}

public showPosition(position: any): void {
  // tslint:disable-next-line: prefer-template
  this.x = 'Latitude: ' + position.coords.latitude + '<br>Longitude: ' + position.coords.longitude;
}

/* public loadWeather(country: string): Observable<any> {
return this.httpClient.get().pipe(
);
} */
}
