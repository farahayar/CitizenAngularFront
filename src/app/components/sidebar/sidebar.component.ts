import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { UserModule } from 'src/app/models/user/user.module';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/services/admin.service';
import { MessagingService } from 'src/app/services/messaging.service';
import { NotificationsService } from 'src/app/services/notifications.service';
import { async } from '@angular/core/testing';
import { createPopper } from '@popperjs/core';
declare var $: any;
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  UserName: String;
  ImageUser;
  isLoggedAdmin = false;
  isLoggedIn;
  nbNotif;
  nofis = [];
  //consulterPostNotif post
  postValides = [];
  imageP: String = '';
  descriptionP: String;
  regionP: String;
  imageUser: String;
  nomUser: String;
  idPost: Number;
  idUserPost: Number;
  titre;

  constructor(private _us: UserService, private router: Router, private toastr: ToastrService,
    private _as: AdminService, private messagingService: MessagingService, private _ns: NotificationsService) { }

  async ngOnInit() {

    await this._as.isLoggedAdmin().subscribe((res) => {
      if (res) {
        this.isLoggedAdmin = true;
      }
      else
        this.isLoggedAdmin = false;

    })
    this._us.isLoggedIn().subscribe((res) => {

      this.isLoggedIn = res

    })

    this._ns.nbNotif().subscribe((res) => {
      this.nbNotif = res
    })

    this._us.getCurrenUser().subscribe((user) => {
      let usr = <any>Object;
      usr = user;
      this.UserName = usr.nom.toUpperCase() + " " + usr.prenom.toUpperCase();
      this.ImageUser = usr.img;
    }, (err) => {
    })
    // this._us.getImage
  }
  goToAjouPost() {
    this.router.navigateByUrl('/in/ajoutPost');
  }
  goToHome() {
    this.router.navigateByUrl('/in/home');
  }
  goToProfile() {
    this.router.navigateByUrl('/in/profile')
  }
  goToPosts() {
    this.router.navigateByUrl('/in/posts');
  }
  goToAdmin(){
    this.router.navigateByUrl('/in/admin');
  }

  logout() {
    this._ns.pushNotifTokenDelete().subscribe(async (res) => {
      await this._us.logout().subscribe((res) => {

        this.messagingService.deleteToken();
        console.log("cv");
        localStorage.removeItem('remember_me');
        localStorage.removeItem('tokenPushNotif');
        localStorage.removeItem('access_token');
        this.router.navigateByUrl('/')
        this.toastr.success("A votre prochaine découverte!");
        localStorage.removeItem("backGStory");

      })

    }, (err) => {
      this.toastr.error("echoue");
    })
  }

  close() {
    $("#notifs").val("");
  }

  getnofis() {
    $('#toNotif').css('cursor', 'pointer');
    this._ns.getNotifs().subscribe((res) => {
      let a = <any>Object;
      a = res;
      this.nofis = a;
      $('#notifs').modal('show');
    })
  }

  gotToNotif(n) {
    if (n.action == "user") {
      $('#notifs').modal('toggle');
      this.router.navigate(['in/profiles', { idUser: n.action_id }]);
    }
    else if (n.action == "post") {
      $('#notifs').modal('toggle');
      this.toCosuleterPostNotif(n.action_id);
    }
    this._ns.deleteNotif(n.id).subscribe((res) => { }, (err) => { });
    this._ns.nbNotif().subscribe((res) => {
      this.nbNotif = res
    })
    $("#nbnots").val(this.nbNotif);

  }

  toCosuleterPostNotif(idP) {
    this._us.getDetailsPost(idP).subscribe((res) => {
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
      $("#usernameN").html(this.nomUser);
      $("#titrePN").html(this.titre);
      $("#descriptionPN").html(this.descriptionP);
      $("#regionPN").html(this.regionP);
      $("#imagePN").attr("src", this.imageP);
      $("#imageUserN").attr("src", this.imageUser);
      $("#loaderN").css("display", "none");
      $("#imagePN").css("display", "block");

    })
    $('#consulterPostNotif').modal('show');
  }

  goToUserProfile() {
    $('#consulterPostNotif').modal('toggle');
    console.log(this.idUserPost, "idddddddd");

    this.router.navigate(['in/profiles', { idUser: this.idUserPost }]);
  }
}
