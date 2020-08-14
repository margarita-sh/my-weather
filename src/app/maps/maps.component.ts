import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { GeolocationService } from '../main/service/geolocation.service';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss']
})
export class MapsComponent implements OnInit {
/* this.mymap = L.map('mapid').setView([53.896772, 30.333349], 13); */
private myKey: string = '5211abf32aeba9a166b91f5e2bba0e49';

public mymap: any;
  public positionLeaflet: any = this.pos.position.map((item: any) => Number(item)).reverse();

  constructor(private pos: GeolocationService) {}
  public ngOnInit(): void {
	  console.log('positionLeaflet', this.positionLeaflet);
	 this.mymap = L.map('mapid').setView(this.positionLeaflet, 13);
	 L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
	}).addTo(this.mymap);
 	this.setMarker(this.positionLeaflet);
}

public setMarker(position){
	L.marker(position).addTo(this.mymap)
		.bindPopup('You are here')
		.openPopup();
}

}
