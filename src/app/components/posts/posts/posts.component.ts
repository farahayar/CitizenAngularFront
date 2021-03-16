import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
declare var $: any;
@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  imageUser: string;
  nomUser: String;
  pren;
  age;
  adresse;
  titre;
  tel;
  email;
  id;
  userPosts;
  nbPosts

  //consulter
  novDescription: String = "";
  postValides = [];
  imageP: String = '';
  descriptionP: String;
  regionP: String;
  idPost: Number;
  idUserPost: Number;
  idCurrentUser;

  signalerForm: FormGroup;

  isLoggedIn = true;

  constructor(private _us: UserService, private t: Title, private toastr: ToastrService,
    private fb: FormBuilder, private router: Router) {

    this.t.setTitle("Home");

    this.signalerForm = fb.group({
      resSignale: new FormControl("", [Validators.required])
    });
  }

  get resSignale() {
    return this.signalerForm.get('resSignale');
  }

  async ngOnInit() {
    await this._us.isLoggedIn().subscribe((res) => {
      let a = <any>Object;
      a = res;
      this.isLoggedIn = a

    },(err)=>{
      this.isLoggedIn=false
    })

    this._us.getValidePosts().subscribe((res) => {
      let a = <any>Object;
      a = res;
      this.userPosts = a.message1;
    })


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

  //modifier description d'un post
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
      $('#consulter').modal('hide');
    }, (err) => {
      this.toastr.error("Echec!")
    });
  }

  goToMap() {
    this.router.navigateByUrl('in/home');
  }

  goToUserProfile() {
    $('#consulter').modal('toggle');
    this.router.navigate(['in/profiles', { idUser: this.idUserPost }]);
  }


}