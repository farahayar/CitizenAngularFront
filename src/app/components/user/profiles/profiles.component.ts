import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { NotificationsService } from 'src/app/services/notifications.service';
declare var $: any;
@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.scss']
})
export class ProfilesComponent implements OnInit {

  imageUser: string;
  nomUser: String;
  pren;
  age;
  adresse;
  tel;
  email;
  id;
  userPosts;
  nbPosts;

  nbSuivits;
  nbAbonements;

  //consulter
  novDescription: String = "";
  postValides = [];
  imageP: String = '';
  descriptionP: String;
  regionP: String;
  idPost: Number;
  idUserPost: Number;
  idCurrentUser;
  titre;

  signalerForm: FormGroup;

  isLoggedIn

  constructor(private _us: UserService, private t: Title, private toastr: ToastrService,
    private fb: FormBuilder, private route: ActivatedRoute, private router: Router, private _ns: NotificationsService) {
    this.route.params.subscribe(params => { this.id = params['idUser']; });
    this.t.setTitle("Home");

    this.signalerForm = fb.group({
      resSignale: new FormControl("", [Validators.required])
    });
  }

  get resSignale() {
    return this.signalerForm.get('resSignale');
  }

  async ngOnInit() {

    $("#desabonne").hide();
    $("#modifProf").hide();
    $("#bshowmodif").show();
    $("#bhidemodif").hide();
    $("#benregistrers").hide();
    $("#enregistrer").hide();
    $("#titreEnregs").hide();
    $("#siganled").hide();

    await this._us.isLoggedIn().subscribe((res) => {

      this.isLoggedIn = res

    })


    console.log("get from url :" + this.id);
    this._us.getCurrenUser().subscribe((res) => {
      let a = <any>Object;
      a = res;
      this.idCurrentUser = a.id;
      if (this.idCurrentUser == this.id) {
        this.router.navigateByUrl('/in/profile');
      }
    })

    this._us.getUserById(this.id).subscribe((res) => {
      let a = <any>Object;
      a = res;
      //calculel d'age
      let dateNaiss = new Date(a.dateNaiss);
      let ageDifMs = Date.now() - dateNaiss.getTime();
      let ageDate = new Date(ageDifMs);
      this.age = Math.abs(ageDate.getUTCFullYear() - 1970);
      //
      this.nomUser = a.nom.charAt(0).toUpperCase() + a.nom.slice(1) + " " + a.prenom.charAt(0).toUpperCase() + a.prenom.slice(1);
      this.tel = a.tel;
      this.email = a.email;
      this.pren = a.prenom.charAt(0).toUpperCase() + a.prenom.slice(1);
      this.adresse = a.adresse.charAt(0).toUpperCase() + a.adresse.slice(1);
      this.imageUser = a.img;
      $('#backimage').css("background-image", "url(" + this.imageUser + ")");

      this._us.getSumPostsUser(this.id).subscribe((res) => {
        let a = <any>Object;
        a = res;
        this.nbPosts = a
      })
      this._us.getSumAbonnementsUser(this.id).subscribe((res) => {
        let a = <any>Object;
        a = res;
        this.nbAbonements = a
      })

      this._us.getSumSuivitsUser(this.id).subscribe((res) => {
        let a = <any>Object;
        a = res;
        this.nbSuivits = a
      })
      this._us.ifCurrentUFollowsUser({ 'suivi_id': this.id }).subscribe((res) => {
        let a = <any>Object;
        a = res;
        if (!a) {
          $("#desabonne").hide();
          $("#abonne").show()
        } else {
          $("#abonne").hide();
          $("#desabonne").show()
        }

      })
      this._us.ifCurrentUSignaledUser({ 'user_idToS': this.id }).subscribe((res) => {
        let a = <any>Object;
        a = res;
        if (a) {
          $("#signal").hide();
          $("#siganled").show();
        } else {
          $("#siganled").hide();
          $("#signal").show()
        }

      })

      this._us.getUserPosts(this.id).subscribe((res) => {
        let a = <any>Object;
        a = res
        this.userPosts = a.message1;
      })
    })


  }
  showmodifProf() {
    $("#modifProf").show("slow");
    $("#bshowmodif").hide();
    $("#bhidemodif").show();
  }
  hidemodifProf() {
    $("#modifProf").hide("slow");
    $("#bhidemodif").hide();
    $("#bshowmodif").show();
    $("#gallery").show();
  }
  showenregistrer() {
    $("#bposts").hide();
    $("#gallery").hide();
    $("#benregistrers").show();
    $("#enregistrer").show();
    $("#titrePosts").hide();
    $("#titreEnregs").show();
  }
  hideenregistrer() {
    $("#benregistrers").hide();
    $("#enregistrer").hide();
    $("#bposts").show();
    $("#gallery").show();
    $("#titreEnregs").hide();
    $("#titrePosts").show();
  }

  //consulter post
  openModel(eid) {

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
      this.titre = post.titre;
      this.imageUser = user.img;
      this.nomUser = (user.nom + " " + user.prenom).toUpperCase();
      $("#username").html(this.nomUser);
      $("#descriptionP").html(this.descriptionP);
      $("#titreP").html(this.titre);
      $("#regionP").html(this.regionP);
      $("#imageP").attr("src", this.imageP);
      $("#imageUser").attr("src", this.imageUser);
      $("#loader").css("display", "none");
      $("#imageP").css("display", "block");
    })

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
  close() {

    $("#novDescription").val("");
    $("#resSignale").val("");
  }
  //open modal signaler
  openModalSignaler() {
    $('#consulter').modal('toggle');
    $('#signalModal').modal('show');
  }

  signaler() {
    this._us.userSignalePost({ 'idUserPost': this.idUserPost, 'idPost': this.idPost, 'resSignale': this.signalerForm.value.resSignale }).subscribe((res) => {
      this.ngOnInit();
      this.toastr.success("Demande envoyée!")
    }, (err) => {
      this.toastr.error(" Echec!")
    })
  }

  desabonner() {
    this._us.unFollowUser({ 'suivi_id': this.id }).subscribe((res) => {
      this.toastr.success("Vous n'êtes plus un abonné de " + this.nomUser);
      this.ngOnInit();
    })
  }

  sabonner() {
    this._us.followUser({ 'abonne_id': this.idCurrentUser, 'suivi_id': this.id }).subscribe(async (res) => {
      let a = <any>Object;
      a =await res;
      let followerName =a.followerName;
      let t = this;
      a.followeeTokens.forEach(element => {
        t._ns.pushNotif("Nouveau abonné", "Desormais, "+followerName+" vous suit", element).subscribe((res) => {
          console.log("res", res);

        }, (err) => { console.log("res", res); });
      });
      this.toastr.success("Vous êtes desormais un abonné de " + this.nomUser);
      this.ngOnInit();
    })
  }

  openModalSignalerUser() {
    $('#signalModalUser').modal('show');
  }

  signalerUser() {
    this._us.userSignaleUser({ 'idUserToSign': this.id, 'resSignale': this.signalerForm.value.resSignale }).subscribe((res) => {
      this.toastr.success("Demande envoyée!");
      $('#signalModalUser').modal('hide');
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

}