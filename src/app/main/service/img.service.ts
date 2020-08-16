import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map} from 'rxjs/operators';

@Injectable()
export class ImgService {
	private myKey: string = '8197081-d9c3bda321b250753ddb7a616';
	public url: string = `https://pixabay.com/api/?key=${this.myKey}&category=nature&image_type=photo`;
	public constructor(private httpClient: HttpClient) {}
	public loadImg(): Observable<any> {
		return this.httpClient.get(this.url).pipe(
			map((data: any) => {
				const randomNumber: number = Math.floor(Math.random() * Math.floor(data.hits.length));
				return data.hits[randomNumber].largeImageURL;
				})
		);
	}

}
