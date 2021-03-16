import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { ToastrService } from 'ngx-toastr';
declare var $: any;
@Component({
  selector: 'app-post-modif',
  templateUrl: './post-modif.component.html',
  styleUrls: ['./post-modif.component.scss']
})
export class PostModifComponent implements OnInit {

  postModifs = [];
  imageP: String;
  descriptionP: String;
  descriptionM: String;
  regionP: String;
  imageUser: String;
  nomUser: String;
  titreP;
  postModifsleng=0;

  constructor(private _as: AdminService, private toastr: ToastrService) { }

  ngOnInit(): void {


    this._as.getModifPosts().subscribe((res) => {
      console.dir(res);

      let a = <any>Object;
      a = res;
      this.postModifs = a.message1;
      this.postModifsleng= a.message1.lenght;
      this.descriptionM=a.message1.descriptionM
      $(document).ready(function () {
        $('#example').DataTable();
      });
    }, (err) => { });


  }

  consulter(p) {
    console.log(p.id);
    this.descriptionM=p.descriptionM
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
  modifier(p) {
    this._as.ModifierPost(p.id).subscribe((res) => {
      this.ngOnInit()
      this.toastr.success("Post Modifié");
    }, (err) => {
      this.toastr.error("Action échouée");
    })

  }
  refuser(p) {
    this._as.refusePostModification(p.id).subscribe((res) => {
      this.ngOnInit();
      this.toastr.success("Post refusé");
    }, (err) => {
      this.toastr.error("Action échouée");
    })
  }


}

