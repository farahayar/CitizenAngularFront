import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { ToastrService } from 'ngx-toastr';
declare var $: any;
@Component({
  selector: 'app-postvalide',
  templateUrl: './postvalide.component.html',
  styleUrls: ['./postvalide.component.scss']
})
export class PostvalideComponent implements OnInit {
  postValidesleng=0;
  postValides = [];
  imageP: String;
  descriptionP: String;
  regionP: String;
  imageUser: String;
  nomUser: String;
  titreP;

  constructor(private _as: AdminService, private toastr: ToastrService) { }

  ngOnInit(): void {


    this._as.getInvalidePosts().subscribe((res) => {
      console.dir(res);

      let a = <any>Object;
      a = res;
      this.postValides = a.message1;
      
      this.postValidesleng=a.message1.length;
      $(document).ready(function () {
        $('#example').DataTable();
      });
    }, (err) => { });


  }

  consulter(p) {
    console.log(p.id);

    this._as.getDetailsPost(p.id).subscribe((res) => {
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
  valider(p) {
    this._as.validPost(p.id).subscribe((res) => {
      this.ngOnInit()
      this.toastr.success("Post validé");
    }, (err) => {
      this.toastr.error("Action échouée");
    })

  }
  refuser(p) {
    this._as.refusePost(p.id).subscribe((res) => {
      this.ngOnInit();
      this.toastr.success("Post refusé");
    }, (err) => {
      this.toastr.error("Action échouée");
    })
  }


}
//"node_modules/datatables.net-dt/css/jquery.dataTables.css"
