import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
declare var $: any;
import * as L from 'leaflet';
import { GpsService } from 'src/app/services/gps.service';
import { Post } from 'src/app/models/post/post';
import { Region } from 'src/app/models/region/region';

@Component({
  selector: 'app-ajout-post',
  templateUrl: './ajout-post.component.html',
  styleUrls: ['./ajout-post.component.scss']
})
export class AjoutPostComponent implements OnInit {

  ajoutPostForm: FormGroup;
  selectedFile: File;
  map: any;
  mapOptions: L.MapOptions;
  theMarker: L.Marker;
  infoDestination;
  signeP = false;

  constructor(private t: Title, private fb: FormBuilder, private toastr: ToastrService, private router: Router,
    private _gps: GpsService, private gpsService: GpsService) {

    this.t.setTitle("Ajout post");

    this.ajoutPostForm = fb.group({
      descriptionP: new FormControl("", [
        Validators.required,
        Validators.pattern("[a-zA-Z][a-zA-Z]+")
      ]),

      titreP: new FormControl("", [
        Validators.required,
        Validators.pattern("[a-zA-Z][a-zA-Z]+")
      ]),

      signe: new FormControl("", [
        Validators.required,
      ]),

      img: new FormControl("", [Validators.required])
    });
  }
  get descriptionP() {
    return this.ajoutPostForm.get('descriptionP');
  }
  get img() {
    return this.ajoutPostForm.get('img');
  }

  get titreP() {
    return this.ajoutPostForm.get('titreP');
  }

  get signe() {
    return this.ajoutPostForm.get('signe');
  }

  ngOnInit() {
    $("#labsigne").html("Ce poste montre un point négatif.");
    this.initializeMapOptions();

  }

  onFileSelected(event) {
    console.log(event);
    this.selectedFile = event.target.files[0];
  }

  FieldsChange(values: any) {
    console.log(values.currentTarget.checked);
    if (values.currentTarget.checked == true) {
      $("#labsigne").html("Ce poste montre un point positif.");
    } else
      $("#labsigne").html("Ce poste montre un point négatif.");

  }

  ajoutPost() {


    const fd = new FormData();
    let data = this.ajoutPostForm.value;
   // if (data.signe == true)
      this.signeP = data.signe;
    const post = new Post(null, data.titreP, data.descriptionP, this.signeP.toString(), null);
    let region = new Region(this.infoDestination.name, this.infoDestination.lat, this.infoDestination.lng)
    fd.append('img', this.selectedFile, this.selectedFile.name);
    fd.append("titre", data.titreP);
    fd.append("des", data.descriptionP);


    console.log("data : ddd", this.signeP);
    if (this.signeP == true) {
      fd.append("signe", "positive");
      //document.getElementById('this.signeP').checked = true;
      //console.log("local : ",localStorage.getItem("this.signeP"));
      console.log("data : ", this.signeP);
    }
    if (this.signeP == false) {
      fd.append("signe", "negative");
      //console.log("local : ",localStorage.getItem("this.signeP"));
      console.log("data : ", this.signeP);
    }
    console.log("data : ", this.signeP);

    fd.append('region', JSON.stringify(region));
    console.dir(fd.get("region"));
    console.log(data.titreP);

    this._gps.addPost(fd).subscribe((res) => {
      this.toastr.success("Post ajouté");
    }, (err) => {
      this.toastr.error("Action échouée");
    })


  }

  private initializeMapOptions() {
    this.mapOptions = {
      center: L.latLng(36.862499, 10.195556),
      zoom: 8,
      layers: [
        L.tileLayer(
          'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          {
            maxZoom: 18,
            attribution: 'Map data © OpenStreetMap contributors'
          }),
      ],
    };
  }
  onMapReady(map: L.Map) {
    setTimeout(() => {
      $(window).trigger('resize');
    }, 0)
    $('#map').on('shown.bs.modal', function (e) {
      setTimeout(function () { map.invalidateSize() }, 0);
    })
    this.map = map;
    let t = this;
    this.map.on('click', function (e) {
      //Add a marker to show where you clicked.

      if (t.theMarker != undefined) {
        t.theMarker.setLatLng([e["latlng"].lat, e["latlng"].lng])
        t.infoDestination = {
          lat: e["latlng"].lat,
          lng: e["latlng"].lng
        }
        t.gpsService.reverseSeach(e["latlng"].lat, e["latlng"].lng).subscribe((result) => {
          console.log(result)
          t.theMarker.bindPopup("<b>" + result.display_name + "</b>").openPopup();
          t.infoDestination = {
            lat: e["latlng"].lat,
            lng: e["latlng"].lng,
            name: result.display_name
          }
          $("#coordonnees").val(result.display_name).change();
        }, (error) => {

        })
      } else {
        t.theMarker = new L.Marker([e["latlng"].lat, e["latlng"].lng])
          .setIcon(
            L.icon({
              iconSize: [25, 41],
              iconAnchor: [13, 41],
              iconUrl: 'leaflet/marker-icon.png'
            }));
        t.theMarker.addTo(map);
        t.gpsService.reverseSeach(e["latlng"].lat, e["latlng"].lng).subscribe((result) => {
          console.log(result)
          t.theMarker.bindPopup("<b>" + result.display_name + "</b>").openPopup();
          t.infoDestination = {
            lat: e["latlng"].lat,
            lng: e["latlng"].lng,
            name: result.display_name
          }
          $("#coordonnees").val(result.display_name).change();
        }, (error) => {

        })

      }
    });
  }

  openmap() {

    $('#mapajout').modal('show');

  }

  closem(){
    $('#mapajout').modal('hide');

  }
}
