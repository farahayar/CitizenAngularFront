import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { ToastrService } from 'ngx-toastr';
declare var $: any;
@Component({
  selector: 'app-posts-signales',
  templateUrl: './posts-signales.component.html',
  styleUrls: ['./posts-signales.component.scss']
})
export class PostsSignalesComponent implements OnInit {

  postSignalesleng=0;
  postSignales = [];
  imageP: String;
  descriptionP: String;
  raison: String;
  regionP: String;
  imageUser: String;
  nomUser: String;
  titreP;

  constructor(private _as: AdminService, private toastr: ToastrService) { }

  ngOnInit(): void {


    this._as.getSignalPosts().subscribe((res) => {
      console.dir(res);

      let a = <any>Object;
      a = res;
      console.log(a);
      
      this.postSignales = a.message1;
      this.raison = a.message1.raison;
      
      this.postSignalesleng=a.message1.length;
      $(document).ready(function () {
        $('#example').DataTable();
      });
    }, (err) => { });


  }

  consulter(p) {
    console.log(p.id);
    this.raison = p.raison
    this._as.getDetailsPost(p.post_id).subscribe((res) => {
      let a = <any>Object;
      a = res;
      let post = a.message1;
      let user = a.message2;
      this.imageP = post.imageP;
      this.descriptionP = post.description;
      this.regionP = post.id_region;
      this.titreP =post.titre;
      this.imageUser = user.img;
      this.nomUser = (user.nom + " " + user.prenom).toUpperCase();
    },
      (err) => {

      })
  }
  accepter(p) {
    this._as.signalerPost(p.id).subscribe((res) => {
      let a=<any>Object;
      a=res;
      if(a.message=="deleted"){
        $("#signaleRes").html("Ce poste a dépassé les 10 signale, il a été supprimé");
      }else{
        $("#signaleRes").html("Ce post est "+a.message+" fois signalé");
      }
      $('#signale').modal('show');
      this.toastr.success("Post Signalé");
    }, (err) => {
      this.toastr.error("Action échouée");
    })

  }
  refuser(p) {
    this._as.refuserPostSignale(p.id).subscribe((res) => {
      this.ngOnInit();
      this.toastr.success("Post refusé");
    }, (err) => {
      this.toastr.error("Action échouée");
    })
  }

  close(){
    this.ngOnInit();
  }


}

