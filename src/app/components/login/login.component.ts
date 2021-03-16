import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from "@angular/platform-browser";
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { UserModule } from 'src/app/models/user/user.module';
import { ToastrService } from 'ngx-toastr';
import { MessagingService } from 'src/app/services/messaging.service';
import { NotificationsService } from 'src/app/services/notifications.service';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginUserForm: FormGroup;
  backGStory = [];
  message;
  constructor(private t: Title, private fb: FormBuilder, private router: Router,
    private _us: UserService, private toastr: ToastrService, private messagingService: MessagingService,
    private _ns: NotificationsService) {
    this.t.setTitle("Login");

    this.loginUserForm = fb.group({
      email: new FormControl("", [Validators.required, Validators.email]),
      motDePass: new FormControl("", [
        Validators.required,
        Validators.minLength(8)
      ]),
      remember_me: new FormControl(false),
    });
  }

  get email() {
    return this.loginUserForm.get('email');
  }

  get motDePass() {
    return this.loginUserForm.get('motDePass');
  }


  ngOnInit(): void {
    localStorage.setItem("backGStory", JSON.stringify(this.backGStory));
    if (localStorage.getItem("access_token")) {
      this.router.navigateByUrl('/in/home')
    }
  }

  over() {
    $(".vertical-center").css("background-image", "url('../../../../assets/LoginTemplate/images/bg-01.jpg')");
    $(".vertical-center").css("opacity", "1");
  }
  out() {
    $(".vertical-center").css("background-image", "url('../../../../assets/LoginTemplate/images/bg-01.jpg')");
    $(".vertical-center").css("opacity", "0.7");
  }

  goToMap() {
    this.router.navigateByUrl('/visiteur');
  }

  login() {
    let data = this.loginUserForm.value;
    this._us.loginUser(data).subscribe(async (res) => {

      this.messagingService.requestPermission();
      let a = await res;

      localStorage.setItem("access_token", res.access_token);
      localStorage.setItem("remember_me", data.remember_me.toString());

      this.router.navigateByUrl('/in/home');
      this.toastr.success("Bienvenue!")
    }, (err) => {
      this.toastr.error(err);
    }
    )
  }
  goToInscription() {
    this.router.navigateByUrl('/inscription');
  }


}
