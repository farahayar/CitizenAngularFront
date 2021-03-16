import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';
import * as bcrypt from 'bcryptjs';
import { Router } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  imageUser: string;
  nomUser: String;
  pren;
  age;
  adresse;
  tel;
  email;
  id;
  userPosts;
  enregitrerPosts;

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
  titre;

  //consulter saved
  novDescriptionS: String = "";
  postValidesS = [];
  imagePS: String = '';
  descriptionPS: String;
  regionPS: String;
  idPostS: Number;
  idUserPostS: Number;
  imageUserS: string;
  nomUserS: String;
  titreS;

  //modif profile
  imageUserM: string;
  nomM = "";
  prenomM = "";
  dateNaissM;
  adresseM = "";
  telM = "";
  emailM = "";
  modp = "";
  rmdp = "";
  //modif image
  selectedFile: File;

  //abonne liste
  listeAbonne;
  suivisAbonne;
  imageUserL: string;
  nomUserL: String;


  constructor(private _us: UserService, private toastr: ToastrService,private router:Router) { }

  ngOnInit(): void {
    $("#modifProf").hide();
    $("#bshowmodif").show();
    $("#bhidemodif").hide();
    $("#benregistrers").hide();
    $("#enregistrer").hide();
    $("#titreEnregs").hide();
    this._us.getCurrenUser().subscribe((res) => {
      let a = <any>Object;
      a = res;

      //calculel d'age
      let dateNaiss = new Date(a.dateNaiss);
      let ageDifMs = Date.now() - dateNaiss.getTime();
      let ageDate = new Date(ageDifMs);
      this.age = Math.abs(ageDate.getUTCFullYear() - 1970);
      //
      this.id = a.id;
      this.nomUser = a.nom.charAt(0).toUpperCase() + a.nom.slice(1) + " " + a.prenom.charAt(0).toUpperCase() + a.prenom.slice(1);
      this.tel = a.tel;
      this.email = a.email;
      this.pren = a.prenom.charAt(0).toUpperCase() + a.prenom.slice(1);
      this.adresse = a.adresse.charAt(0).toUpperCase() + a.adresse.slice(1);
      this.imageUser = a.img;
      $('#backimage').css("background-image", "url(" + this.imageUser + ")");
      this._us.getUserPosts(this.id).subscribe((res) => {
        let a = <any>Object;
        a = res
        this.userPosts = a.message1;
      })
      this._us.getEnregistrerPosts(this.id).subscribe((res) => {
        let a = <any>Object;
        a = res
        this.enregitrerPosts = a.message1;
      })

      this._us.getSumPostsUser(this.id).subscribe((res) => {
        let a = <any>Object;
        a = res;
        this.nbPosts= a
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

  openModalSupprimer() {
    $('#consulterEnregistrer').modal('toggle');
    $('#modalConfirmDelete').modal('show');
  }
  openModalSupprimer2() {
    $('#consulter').modal('toggle');
    $('#modalConfirmDelete2').modal('show');
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
      this.titre= post.titre;
      this.imageUser = user.img;
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

    $('#consulter').modal('show');
    
  }


  openModelSaved(eid) {

    this._us.getDetailsPost(eid).subscribe((res) => {
      let a = <any>Object;
      a = res;
      var post = a.message1;
      var user = a.message2;
      this.idPostS = post.id;
      this.idUserPostS = user.id;
      this.imagePS = post.imageP;
      this.descriptionPS = post.description;
      this.regionPS = post.id_region;
      this.titreS= post.titre;
      this.imageUserS = user.img;
      this.nomUserS = (user.nom + " " + user.prenom).toUpperCase();
      
      $("#usernameS").html(this.nomUserS);
      $("#descriptionPS").html(this.descriptionPS);
      $("#titrePS").html(this.titreS);
      $("#regionPS").html(this.regionPS);
      $("#imagePS").attr("src", this.imagePS);
      $("#imageUserS").attr("src", this.imageUserS);
      $("#loader").css("display", "none");
      $("#imageP").css("display", "block");
    })
    
    $('#consulterEnregistrer').modal('show');
    
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
  }

  //Modifier Profile
  modifProfile() {
    this.nomM = $("#nomM").val();
    this.prenomM = $("#prenomM").val();
    this.dateNaissM = $("#dattnaissM").val();
    this.telM = $("#telM").val();
    this.adresseM = $("#adresseM").val();
    this.emailM = $("#addemailM").val();
    let mdp = $("#motDePasseM").val();
    let rmdp = $("#reMotDePasseM").val();
    "use strict";
    if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.emailM)) && this.emailM != "") {
      $("#addemailM").focus();
      this.toastr.error("Email incorrect");
    } else if ((mdp != "" && rmdp != "") && mdp != "" && rmdp != "" && rmdp.length < 8 && mdp.length < 8) {
      $("#motDePasseM").focus();
      this.toastr.error("verifier votre mot de passe");
    } else if (!(this.telM.length > 7 || this.telM.length == 0)) {
      $("#telM").focus();
      this.toastr.error("Num Telephone incorrect");
    } else {
      if (mdp != "" && rmdp != "") {
        let mdpdb;
        this._us.getUserPw(this.id).subscribe((res) => {
          let a = <any>Object;
          a = res;
          mdpdb = a.message;
          if (bcrypt.compare(mdp, mdpdb)) {
            const salt = bcrypt.genSaltSync(10);
            this.rmdp = bcrypt.hashSync(rmdp, 10);

          }
        })

      }

      this._us.modifUser({
        'idUser': this.id,
        'nomM': this.nomM,
        'prenomM': this.prenomM,
        'dateNaissM': this.dateNaissM,
        'telM': this.telM,
        'adresseM': this.adresseM,
        'emailM': this.emailM,
        'rmdp': this.rmdp
      }).subscribe((res) => {
        this.ngOnInit();
        this.toastr.success("Profile modifié!")
      }, (err) => {
        this.toastr.error(" Echec!")
      })
    }
  }

  //modif image
  onFileSelected(event) {
    this.selectedFile = event.target.files[0];
  }

  modifierImageUser() {
    const fd = new FormData();
    if (this.selectedFile.size == 0) {
      $("#inputmodfif").focus();
      this.toastr.error("Veuiller choisir une image");
    }
    else {
      fd.append('img', this.selectedFile, this.selectedFile.name);
      fd.append("idUser", this.id);
      this._us.modifImageUser(fd).subscribe((res) => {
        this.ngOnInit();
        this.toastr.success("image modifiée")
      }, (err) => {
        this.toastr.error(" Echec!")
      })
    }
    $('#modifModal').modal('toggle');
  }
  mdifModal() {
    $('#modifModal').modal('show');
  }

  //supprimer post
  supprimerPost() {
    this._us.deletePost(this.idPost).subscribe((res) => {
      this.toastr.success("Poste Supprimer!");
      $('#modalConfirmDelete2').modal('hide');
    }, (err) => {
      this.toastr.error("Echec!")
    });
    $('#consulter').modal('hide');

  }

  

  //supprimer post enregistrer
  supprimerPostEnregistrer() {
    this._us.deletePostEnregistrer(this.idPostS).subscribe((res) => {
      this.toastr.success("Poste Supprimer!");
      $('#modalConfirmDelete').modal('hide');
    }, (err) => {
      this.toastr.error("Echec!")
    });
    
  }

  //liste abonnee
  listAbonne(){
    this._us.getAbonneUsers().subscribe((res) => {
      let a = <any>Object;
      a = res;
      this.listeAbonne = a.message1;
 
    })
    $('#consulterListeAbonne').modal('show');

  }


  //liste suivi
  suiviAbonne(){
    this._us.getSuiviUsers().subscribe((res) => {
      let a = <any>Object;
      a = res;
      this.suivisAbonne = a.message1;
      
    })
    $('#consulterSuiviAbonne').modal('show');

  }



  goToUserProfile() {
    $('#consulterEnregistrer').modal('toggle');
    this.router.navigate(['in/profiles', { idUser: this.idUserPostS }]);
  }


  goToUserProfile2(id) {
    $('#consulterListeAbonne').modal('toggle');
    this.router.navigate(['in/profiles', { idUser: id }]);
  }
}
