import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { NotificationsService } from 'src/app/services/notifications.service';
declare var $: any;
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

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

  //notifs
  nbNotifa;
  nofisa = [];

  constructor(private _us: UserService, private t: Title, private toastr: ToastrService,
    private fb: FormBuilder, private router: Router,private _ns: NotificationsService) {

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

    this._ns.nbNotifAdmin().subscribe((res) => {
      this.nbNotifa = res
  })
    this._us.getValidePosts().subscribe((res) => {
      let a = <any>Object;
      a = res;
      this.userPosts = a.message1;
    })


  }

  //consulter post

  /*
  openModelPostValide() {
    $('#postValide').modal('show');
  }

  openModelPostModif() {
    $('#postModif').modal('show');
  }

  openModelPostsSignales() {
    $('#postsSignales').modal('show');
  }

  openModelUsersSignales() {
    $('#usersSignales').modal('show');
  }


  goToMap() {
    this.router.navigateByUrl('in/home');
  }

*/
  goToValiderPost() {
    this.router.navigateByUrl('/in/postValide');
  }
  goToModifPost() {
    this.router.navigateByUrl('/in/postModif');
  }
  goToPostsSignales() {
    this.router.navigateByUrl('/in/postsSignales');
  }
  goToUserSignales() {
    this.router.navigateByUrl('/in/usersSignales');
  }
  goToUsers() {
    this.router.navigateByUrl('/in/listeUsers');
  }
  close1() {
    $("#mNotifs").hide();
}

getnofis() {
    $('#toNotif').css('cursor', 'pointer');
    this._ns.getNotifsAdmin().subscribe((res) => {
        let a = <any>Object;
        a = res;
        this.nofisa = a.reverse(); 
        $('#mNotifs').show();
    })
}

gotToNotif(n) {
  console.log(n.action,"action");
  
    if (n.action == "validerPost") {
        $('#mNotifs').hide();
        this.router.navigateByUrl('/in/postValide')
    }
    else if (n.action == "modifierPost") {
        $('#mNotifs').hide();
        this.router.navigateByUrl('/in/postModif')
    }
    else if (n.action == "signalerPost") {
        $('#mNotifs').hide();
        this.router.navigateByUrl('/in/postsSignales')
    }
    else if (n.action == "signalerUser") {
        $('#mNotifs').hide();
        this.router.navigateByUrl('/in/usersSignales')
    }

    this._ns.nbNotifAdmin().subscribe((res) => {
        this.nbNotifa = res
    })
    $("#nbnots").val(this.nbNotifa);

}


supprimerNotif(n) {
    this._ns.deleteNotifAdmin(n.id).subscribe((res) => { }, (err) => { });
}
close() {
  $("#mNotifs").modal("toggle");
}

}
