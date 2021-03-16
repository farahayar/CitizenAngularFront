import { Component, OnInit } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { UserService } from "src/app/services/user.service";
import { UserModule } from 'src/app/models/user/user.module';

declare var $: any;
@Component({

  selector: "app-inscription",
  templateUrl: "./inscription.component.html",
  styleUrls: ["./inscription.component.scss"],
})
export class InscriptionComponent implements OnInit {
  inscriptionUserForm: FormGroup;
  selectedFile: File;
  user: UserModule;

  constructor(private t: Title, private _us: UserService,
    private fb: FormBuilder, private toastr: ToastrService, private router: Router) {

    this.t.setTitle("Inscription");

    this.inscriptionUserForm = fb.group({
      nom: new FormControl("", [
        Validators.required,
        Validators.pattern("[a-zA-Z][a-zA-Z]+")
      ]),
      prenom: new FormControl("", [
        Validators.required,
        Validators.pattern("[a-zA-Z][a-zA-Z]+")
      ]),
      dateNaiss: new FormControl("", [
        Validators.required,
      ]),
      adresse: new FormControl("", [
        Validators.required,
        Validators.pattern("[a-zA-Z][a-zA-Z][0-9]+")
      ]),
      tel: new FormControl("", [
        Validators.required,
        Validators.pattern("[0-9]+"),
        Validators.minLength(8)
      ]),
      cin: new FormControl("", [
        Validators.required,
        Validators.pattern("[0-9]+"),
        Validators.minLength(8),
        Validators.maxLength(8)
      ]),
      email: new FormControl("", [Validators.required, Validators.email]),
      motDePasse: new FormControl("", [
        Validators.required,
        Validators.minLength(8)
      ]),
      ReMotDePasse: new FormControl("", [
        Validators.required,
        Validators.minLength(8)
      ]),
      img: new FormControl("", [Validators.required])
    });
  }

  get nom() {
    return this.inscriptionUserForm.get('nom');
  }

  get prenom() {
    return this.inscriptionUserForm.get('prenom');
  }

  get dateNaiss() {
    return this.inscriptionUserForm.get('dateNaiss');
  }

  get adresse() {
    return this.inscriptionUserForm.get('adresse');
  }

  get tel() {
    return this.inscriptionUserForm.get('nom');
  }

  get cin() {
    return this.inscriptionUserForm.get('cin');
  }

  get email() {
    return this.inscriptionUserForm.get('email');
  }

  get motDePasse() {
    return this.inscriptionUserForm.get('motDePasse');
  }

  get ReMotDePasse() {
    return this.inscriptionUserForm.get('ReMotDePasse');
  }

  get img() {
    return this.inscriptionUserForm.get('img');
  }

  ngOnInit() {
    /*$(function(){
      $("#dateNaiss").datepicker();
    })*/

  }

  onFileSelected(event) {
    console.log(event);
    this.selectedFile = event.target.files[0];
  }



  inscription() {

    const fd = new FormData();
    let data = this.inscriptionUserForm.value;

    const usr = new UserModule(data.nom, data.prenom, data.dateNaiss, data.adresse, data.email, data.motDePasse,
      data.cin, data.tel, null);
    fd.append('img', this.selectedFile, this.selectedFile.name);
    fd.append('user', JSON.stringify(usr));
    console.log("UserModule" + fd.get("user"));

    this._us.addUser(fd, data.ReMotDePasse).subscribe(
      (val) => {
        console.log("user2: " + fd.get("user"));
        console.log("POST call successful value returned in body", val);
        this.router.navigateByUrl('/')
      },
      response => {
        console.log("user3: " + fd.get("user"));
        console.log("POST call in error", response);
      },
      () => {
        console.log("user4: " + fd.get("user"));
        console.log("The POST observable is now completed.");

      }
    )
  }
}

