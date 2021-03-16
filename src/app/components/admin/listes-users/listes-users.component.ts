import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import * as bcrypt from 'bcryptjs';


@Component({
  selector: 'app-listes-users',
  templateUrl: './listes-users.component.html',
  styleUrls: ['./listes-users.component.scss']
})
export class ListesUsersComponent implements OnInit {

  imageUser;
  nomUser;
  pren;
  age;
  adresse;
  tel;
  email;
  id;
  nbPosts;

  usersListe;
  nbAbonements;
  nbSuivits;

  constructor(private _as: AdminService, private toastr: ToastrService, private router: Router, private _us:UserService) { }

  ngOnInit(): void {
    this._as.getAllUsers().subscribe((res) => {
      let a = <any>Object;
      a = res;
      this.usersListe = a.message1;
      

    })
  }

  //consulter user
  openModel(eid) {

    this._as.getUserById(eid).subscribe((res) => {
      let a = <any>Object;
      a = res;

      //calculel d'age
      let dateNaiss = new Date(a.dateNaiss);
      let ageDifMs = Date.now() - dateNaiss.getTime();
      let ageDate = new Date(ageDifMs);
      this.age = Math.abs(ageDate.getUTCFullYear() - 1970);
      //
      this.id = a.id;
      console.log(a.id);
      this.nomUser = a.nom.charAt(0).toUpperCase() + a.nom.slice(1) + " " + a.prenom.charAt(0).toUpperCase() + a.prenom.slice(1);
      this.tel = a.tel;
      this.email = a.email;
      this.pren = a.prenom.charAt(0).toUpperCase() + a.prenom.slice(1);
      this.adresse = a.adresse.charAt(0).toUpperCase() + a.adresse.slice(1);
      this.imageUser = a.img;

      

      $("#username").html(this.nomUser);
      $("#imageUser").attr("src", this.imageUser);
      $("#telUser").html(this.tel);
      $("#emailUser").html(this.email);

      $("#loader").css("display", "none");
      $("#imageP").css("display", "block");
      
    });

    this._us.getSumPostsUser(eid).subscribe((res) => {
      let a = <any>Object;
      a = res;
      this.nbPosts = a
    })

    this._us.getSumAbonnementsUser(eid).subscribe((res) => {
      let a = <any>Object;
      a = res;
      this.nbAbonements = a
    })

    this._us.getSumSuivitsUser(eid).subscribe((res) => {
      let a = <any>Object;
      a = res;
      this.nbSuivits = a
    })
    $('#consulter').show();
  }

  goToMap() {
    this.router.navigateByUrl('in/home');
  }

  
  close() {
    $('#consulter').hide();
  }

  //delete user
  delete(idUser){
    this._as.deleteUserById(idUser).subscribe((res) => {      
      this.toastr.success("User Supprimer!");
      this.ngOnInit();
    }, (err) => {
      this.toastr.error("Echec!")
    }); 
  }

  //Valide user to admin
  valideUserToAdmin(idUser) {
  
    this._as.valideUserToAdmin(idUser).subscribe((res) => {
      this.toastr.success("Admin ajouter!");
      this.ngOnInit();
    }, (err) => {
      this.toastr.error("Echec!")
    });
  }

  //Valide admin to user
  unValideAdminToUser(idUser) {
   
    this._as.unValideAdminToUser(idUser).subscribe((res) => {
      this.toastr.success("Admin Rretirer!");
      this.ngOnInit();
    }, (err) => {
      this.toastr.error("Echec!")
    });
  }

  goToUserProfile() {
    $('#consulter').hide();
    this.router.navigate(['in/profiles', { idUser: this.id }]);
  }

}
