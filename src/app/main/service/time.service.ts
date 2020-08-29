import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class TimeService {

	public getCuttentTime(offset: number): string {
		console.log(offset);
		  // create Date object for current location
		  const localTime: Date = new Date();

		  const utc: any = localTime.getTime() + (localTime.getTimezoneOffset() / 60000);
	  
		  // create new Date object for different city
		  // using supplied offset
		  const needTime: any = new Date(utc + (offset/3600000));
	  
		  // return time as a string
		  return needTime.toLocaleString();
	}
};

