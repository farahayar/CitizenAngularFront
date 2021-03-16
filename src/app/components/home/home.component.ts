import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as L from 'leaflet';
import "leaflet/dist/images/marker-shadow.png";



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
 /* map: L.Map;
  
  icon = {
    icon: L.icon({
      iconSize: [ 25, 41 ],
      iconAnchor: [ 13, 0 ],
      // specify the path here
      iconUrl: 'leaflet/marker-icon.png',
      shadowUrl: 'leaflet/marker-shadow.png'
   })
};
  
@ViewChild('map') mapContainer: ElementRef;
*/
  constructor(){}
   

  ngOnInit(): void {
    //Marker.prototype.options.icon = this.defaultIcon;
//    this.leafletMap();

      
    
}
/*
leafletMap() {
  var map = L.map('map').setView([36.482326, 9.936732], 9); // LIGNE 18

        var osmLayer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', { // LIGNE 20
            attribution: '© OpenStreetMap contributors',
            maxZoom: 19
        });
    
      map.addLayer(osmLayer); 

     /* this.map.locate({
        setView: true,
        maxZoom: 10
      }).on('locationfound', (e) => {
        console.log('found you');
        })
      */
    /*  var marker = L.marker([36.482326, 9.936732], this.icon).addTo(map);
}*/

}
