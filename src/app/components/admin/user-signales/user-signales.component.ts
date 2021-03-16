import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-user-signales',
  templateUrl: './user-signales.component.html',
  styleUrls: ['./user-signales.component.scss']
})
export class UserSignalesComponent implements OnInit {

 
  userSignalesleng=0;
  userSignales = [];
  imageP: String;
  descriptionP: String;
  raison: String;
  regionP: String;
  imageUser: String;
  nomUser: String;

  constructor(private _as: AdminService, private toastr: ToastrService,private _us:UserService,private router:Router) { }

  ngOnInit(): void {


    this._as.getSignalUsers().subscribe((res) => {
      console.dir(res);

      let a = <any>Object;
      a = res;
      this.userSignales = a.message1;
      this.raison = a.message1.raison;
      this.userSignalesleng=a.message1.length;
      $(document).ready(function () {
        $('#example').DataTable();
      });
    }, (err) => { });


  }

  consulter(p) {
    this.router.navigate(['in/profiles', { idUser: p.id }]);
  }
  accepter(p) {
    this._as.signalerUser(p.id).subscribe((res) => {
      let a=<any>Object;
      a=res;
      if(a.message=="deleted"){
        $("#signaleRes").html("Cet utilisateur a dépassé les 10 signale, il a été supprimé");
      }else{
        $("#signaleRes").html("Cet utilisateur est "+a.message+" fois signalé");
      }
      $('#signale').modal('show');
      this.toastr.success("utilisateur Signalé");
    }, (err) => {
      this.toastr.error("Action échouée");
    })

  }
  refuser(p) {
    this._us.refuserUserSignale(p.id).subscribe((res) => {
      this.ngOnInit();
      this.toastr.success("utilisateur refusé");
    }, (err) => {
      this.toastr.error("Action échouée");
    })
  }

  close(){
    this.ngOnInit();
  }


}

