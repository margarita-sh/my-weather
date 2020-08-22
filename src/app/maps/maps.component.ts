import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { GeolocationService } from '../main/service/geolocation.service';

@Component({
	selector: 'app-maps',
	templateUrl: './maps.component.html',
	styleUrls: ['./maps.component.scss']
})
export class MapsComponent implements OnInit {
	public mymap: any;
	//public positionLeaflet: any = this.pos.position.map((item: any) => Number(item)).reverse();
	public positionLeaflet: any;

	constructor(private pos: GeolocationService) { }
	public ngOnInit(): void {
		/*this.mymap = L.map('mapid').setView(this.positionLeaflet, 13);
		L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
		}).addTo(this.mymap);
		this.setMarker(this.positionLeaflet);*/
	}

	public setMarker(position: any): void {
		L.marker(position).addTo(this.mymap)
			.bindPopup('You are here')
			.openPopup();
	}

}
