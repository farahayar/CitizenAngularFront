import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import * as L2 from 'leaflet.markercluster';
import "leaflet/dist/images/marker-shadow.png";
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { async } from 'rxjs/internal/scheduler/async';
import { log } from 'util';
declare var $: any;
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  isLoggedIn
  ifPostBelongsUser;
  ifPostDontBelongsUser;
  mapOptions: L.MapOptions;
  theMarker: L.Marker;
  infoDestination;
  map: any;
  markers = new L2.MarkerClusterGroup();
  novDescription: String = "";
  // resSignale: String = "";
  postValides = [];
  imageP: String = '';
  descriptionP: String;
  regionP: String;
  imageUser: String;
  nomUser: String;
  idPost: Number;
  idUserPost: Number;
  signalerForm: FormGroup;
  titre;


  //story
  idPostS: Number;
  descriptionPS: String;
  regionPS: String;
  imagePS: String = '';
  imageUserS: String;
  nomUserS: String;
  idUS: Number;
  storysUser = [];
  backGStory = [];
  lengthTbSt = 0;
  tstoryUser = [];

  //search
  nomUserCher: String;

  icon = {
    icon: L.icon({
      iconSize: [25, 41],
      iconAnchor: [13, 0],
      // specify the path here
      iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
      shadowUrl: 'leaflet/marker-shadow.png',
    })
  };
  icon2 = {
    icon: L.icon({
      iconSize: [25, 41],
      iconAnchor: [13, 0],
      // specify the path here
      iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
      shadowUrl: 'leaflet/marker-shadow.png',
    })
  };

  x = "normalmap";
  constructor(private _us: UserService, private t: Title, private toastr: ToastrService,
    private router: Router, private fb: FormBuilder) {
    this.t.setTitle("Home");
    this.signalerForm = fb.group({
      resSignale: new FormControl("", [Validators.required])
    });
  }
  get resSignale() {
    return this.signalerForm.get('resSignale');
  }
  ngOnInit() {
    this._us.isLoggedIn().subscribe((res) => {

      this.isLoggedIn = res

    })

    this.backGStory = JSON.parse(localStorage.getItem("backGStory"));
    this.init();
    this._us.getStoryUser().subscribe((res) => {
      let a = <any>Object;
      a = res;
      var user = a;
      this.storysUser = user;

    });

    setTimeout(() => {
      $(window).trigger('resize');
    }, 50)
    if (this.x == "search") {
      this._us.getValideUserPosts(($("#search").val().split(" "))[0]).subscribe(async (res) => {
        let a = <any>Object;
        a = res;
        this.postValides = await a.message1;
        this.onMapReady(this.map);
      });
    }
    else {
      this._us.getValidePosts().subscribe(async (res) => {
        let a = <any>Object;
        a = res;
        this.postValides = await a.message1;
        this.onMapReady(this.map);
        this.x = "normalmap";
      });
    }


  }

  init() {
    setTimeout(() => {
      $(window).trigger('resize');
    }, 50)
    this.initializeMapOptions();

    // $('.fixed-action-btn').floatingActionButton();

    this._us.getAllUsersNames().subscribe((res) => {
      let a = <any>Object;
      a = res;
      $(function () {
        var usernames = a;
        $("#search").autocomplete({
          source: usernames
        });
        $("#searchU").autocomplete({
          source: usernames,
          //id: users.charAt(0)
        });
      });
    }, (err) => { })

  }

  search() {
    this.markers.clearLayers();
    this.mapOptions = L2.MapOptions;
    this.theMarker = L2.Marker;
    this.markers = new L2.MarkerClusterGroup();
    this.x = "search";
    this.ngOnInit();
  }

  searchUser() {
    var valeu = $("#searchU").val();

    var id = valeu.charAt(0);
    this._us.ifUserExists(id).subscribe(async (res) => {
      let a = <any>Object;
      a =await res;
      if (a.message) {
        this.router.navigate(['in/profiles', { idUser: id }]);
      }
      else {
        $("#userInexistant").modal('show');
      }

    })
    //
  }


  private initializeMapOptions() {

    this.mapOptions = {
      center: L.latLng(36.862499, 10.195556),
      zoom: 8,
      layers: [
        L.tileLayer(
          'https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png',
          {
            maxZoom: 19,
            attribution: 'Map data © OpenStreetMap contributors'
          })
      ],
    };

  }
  onMapReady(map: L.Map) {
    setTimeout(() => {
      $('body').on('shown.bs.modal', function (e) {
        setTimeout(function () { map.invalidateSize() }, 0);
      })
      this.map = map;
      let t = this;


      this.postValides.forEach(element => {
        //this.idPost = element.id;
        let t = this;
        this.markers.addLayer(L.marker([element.id_region.latitude, element.id_region.longitude], element.signe == "positive" ? this.icon : this.icon2)
          .bindTooltip(element.titre, { permanent: false, direction: 'top' })
          .on('click', function () {

            $("#imageP").css("display", "none");
            $("#loader").css("display", "block");
            t._us.ifPostBelongsUser(element.id).subscribe(async (res) => {
              let b = <any>Object;
              b = res;
              console.log("case1" + b.message);
              let value = await b.message;
              t.openModel(element.id, value);
            })

          }));
        map.addLayer(this.markers);
      });

    }, 0);
  }
  openModel(eid, value) {
console.log("value"+value);

    this.ifPostBelongsUser = value;
    this.ifPostDontBelongsUser = !value;
    console.log("ipbu" + this.ifPostBelongsUser);
    console.log("ipdbu" + this.ifPostDontBelongsUser);

    this._us.getDetailsPost(eid).subscribe((res) => {
      let a = <any>Object;
      a = res;
      var post = a.message1;
      var user = a.message2;
      this.idPost = post.id;
      this.idUserPost = user.id;
      this.imageP = post.imageP;
      this.descriptionP = post.description;
      this.regionP = post.id_region;
      this.imageUser = user.img;
      this.titre = post.titre;
      this.nomUser = (user.nom + " " + user.prenom).toUpperCase();
      $("#username").html(this.nomUser);
      $("#titreP").html(this.titre);
      $("#descriptionP").html(this.descriptionP);
      $("#regionP").html(this.regionP);
      $("#imageP").attr("src", this.imageP);
      $("#imageUser").attr("src", this.imageUser);
      $("#loader").css("display", "none");
      $("#imageP").css("display", "block");


    })
    if(!value){
      $("#actions").append("<button id='signalerCHILD' type='button' class='btn btn-outline-danger' (click)='openModalSignaler()'>Signaler</button>");
    }
    else{
      $("#actions").append("<button id='suppCHILD' type='button' class='btn btn-outline-secondary' (click)='openModalSupprimer()'><i class='fa fa-trash-o fa-lg'></i> Supprimer</button>");
    }
    $('#consulter').modal('show');
  }
  //modal affirmer modification 
  affirmerModif() {
    this.novDescription = $("#novDescription").val();
    if (this.novDescription == "") {
      $("#messageModif").html("Vous n'avez pas taper une nouvelle description.");
      $('#modif').modal('show');
      $('#mod').attr('disabled', true);
    } else {
      $('#mod').attr('disabled', false);
      $("#messageModif").html("En cliquant sur modifier votre demande sera envoyer à l'administarteur.");
      $('#consulter').modal('toggle');
      $('#modif').modal('show');
    }
  }
  //modifier decription d'un post
  modifier() {
    this._us.userModifPost({ 'idUserPost': this.idUserPost, 'idPost': this.idPost, 'novDescription': this.novDescription }).subscribe((res) => {
      this.toastr.success("Demande envoyée!")
    }, (err) => {
      this.toastr.error(" Echec!")
    })
  }
  //reset values after modal close
  close() {
    $("#novDescription").val("");
    $("#resSignale").val("");
    $("#signalerCHILD").remove();
    $("#suppCHILD").remove();
  }
  //open modal signaler
  openModalSignaler() {
    $('#consulter').modal('toggle');
    $('#signalModal').modal('show');
  }

  openModalSupprimer() {
    $('#consulter').modal('toggle');
    $('#modalConfirmDelete').modal('show');
  }

  siganler() {
    this._us.userSignalePost({ 'idUserPost': this.idUserPost, 'idPost': this.idPost, 'resSignale': this.signalerForm.value.resSignale }).subscribe((res) => {
      this.toastr.success("Demande envoyée!");
      $('#signalModal').modal('hide');
    }, (err) => {
      this.toastr.error(" Echec!")
    })
  }

  enregistrerPost() {
    this._us.userEnregistrerPost(this.idPost).subscribe((res) => {
      this.toastr.success("Poste Enregistré!");
      $('#consulter').modal('hide');
    }, (err) => {
      this.toastr.error("Echec!")
    })
  }

  supprimerPost() {
    this._us.deletePost(this.idPost).subscribe((res) => {
      this.toastr.success("Poste Supprimer!");
      $('#modalConfirmDelete').modal('hide');
    }, (err) => {
      this.toastr.error("Echec!")
    });
  }


  goToUserProfileS() {
    $('#consulterS').modal('toggle');
    this.router.navigate(['in/profiles', { idUser: this.idUserPost }]);
  }
  goToUserProfile() {
    $('#consulter').modal('toggle');
    this.router.navigate(['in/profiles', { idUser: this.idUserPost }]);
  }


  storys(s) {



    this._us.getStoryUserId(s.user_id).subscribe(async (res) => {
      let a = <any>Object;
      a = res;
      this.tstoryUser = await a;

      this.getDtailsPostByUserId(this.tstoryUser[this.lengthTbSt]);
      this._us.getUserById(s.datePost.id).subscribe((res) => {
        let a = <any>Object;
        a = res;
        this.idUserPost = s.datePost.id;
        this.imageUserS = a.img;
        this.nomUserS = (a.nom + " " + a.prenom).toUpperCase();
        $("#usernames").html(this.nomUserS);
        $("#imageUsers").attr("src", this.imageUserS);
      })
      $('#consulterS').modal('show');
      this.backGStory.push(s.id);
      localStorage.setItem("backGStory", JSON.stringify(this.backGStory));
      $("#backGStory").css("background-color", "LightGray");
    });

  }
  getDtailsPostByUserId(id) {
    this._us.getDetailsPost(id).subscribe((res) => {
      let a = <any>Object;
      a = res;
      var post = a.message1;
      this.idPostS = post.id;

      this.imagePS = post.imageP;
      this.descriptionPS = post.description;
      this.regionPS = post.id_region;
      $("#descriptionP").html(this.descriptionPS);
      $("#regionP").html(this.regionPS);
      $("#imagePs").attr("src", this.imagePS);

      $("#loader").css("display", "none");
      $("#imageP").css("display", "block");
    })
  }


  ToPrevious() {
    if (this.lengthTbSt > 0) {


      this.lengthTbSt = this.lengthTbSt - 1;
      this.getDtailsPostByUserId(this.tstoryUser[this.lengthTbSt]);

    }
  }
  ToNext() {
    if (this.lengthTbSt < this.tstoryUser.length - 1) {

      this.lengthTbSt = this.lengthTbSt + 1;
      this.getDtailsPostByUserId(this.tstoryUser[this.lengthTbSt]);

    }
  }


}