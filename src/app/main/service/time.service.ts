import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class TimeService {

	public getCuttentTime(offset: number): any {
		/*if(offset === 0){
			return;
		}*/
		/* const localTime: Date = new Date();

		 const utc: any = localTime.getTime() + (localTime.getTimezoneOffset() / 60000);
		 const needTime: any = new Date(utc + (offset/3600000));
		 // return time as a string
		 return needTime.toLocaleString(); */
		const now: Date = new Date();
		const currentDate: Date = new Date(now.getTime() + now.getTimezoneOffset() * 60000 + offset);
		const day: number = currentDate.getDate();
		const dayOfWeek: number = currentDate.getDay();
		const month: number = currentDate.getMonth();
		const hour: number = currentDate.getHours();
		const min: number = currentDate.getMinutes();
		const sec: number = currentDate.getSeconds();
		//return `${dayOfWeek}, ${day}/${month}, ${hour}:${min}:${sec}`; 
		return currentDate;
	}
}
