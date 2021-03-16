import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { BehaviorSubject } from 'rxjs'
import { NotificationsService } from './notifications.service';
import { async } from '@angular/core/testing';
import { R3BoundTarget } from '@angular/compiler';
import { ToastrService } from 'ngx-toastr';
@Injectable()
export class MessagingService {
  currentMessage = new BehaviorSubject(null);
  constructor(private angularFireMessaging: AngularFireMessaging, private _ns: NotificationsService, private toastr: ToastrService) {
    this.angularFireMessaging.messaging.subscribe(
      (_messaging) => {
        _messaging.onMessage = _messaging.onMessage.bind(_messaging);
        _messaging.onTokenRefresh = _messaging.onTokenRefresh.bind(_messaging);
      }
    )

  }
  requestPermission() {
    this.angularFireMessaging.requestToken.subscribe(
      async (token) => {
        let tokenPushNotif = await token;
        localStorage.setItem("tokenPushNotif", tokenPushNotif);
        this._ns.pushNotifTokenAdd(token).subscribe((res) => { });
        console.log(token);
      },
      (err) => {
        console.error('Unable to get permission to notify.', err);
      }
    );
  }
  receiveMessage() {
    this.angularFireMessaging.messages.subscribe(
      (payload) => {
        console.log("new message received. ", payload);
        this.currentMessage.next(payload);
        let a=<any>Object;
        a=payload;
        
        this.showCustomNotificaion(payload)
      })
  }

  showCustomNotificaion(playload: any) {
    let notify_data = playload['notification'];
    let title = notify_data['title'];
    let options = {
      body: notify_data['body'],
      icon: "../../../../assets/SidebarTemplate/images/bg_2.jpg",
      badge: "../../../../assets/SidebarTemplate/images/bg_2.jpg",
      image: "../../../../assets/SidebarTemplate/images/bg_2.jpg",
    };
    let notify: Notification = new Notification(title, options)
    console.log("zz", notify_data['body'].toString());
    
    this.toastr.success( notify_data['body'].toString());
    notify.onclick = event => {
      event.preventDefault();
      window.location.href = "http://localhost:4200/"
    }
  }

  deleteToken() {
    this.angularFireMessaging.messaging.subscribe(
      (_messaging) => {
        let token = localStorage.getItem("tokenPushNotif");
        _messaging.deleteToken(token);
      })
  }
}