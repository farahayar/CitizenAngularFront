import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(private http: HttpClient) { }


  private api = "http://localhost:8000/api/auth/";

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  pushNotifTokenAdd(pushNotToken) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem("access_token")
      })

    };
    return this.http.post(this.api + "pushNotifTokenAdd", { pushNotToken }, httpOptions);
  }

  pushNotif(title, b, token) {
    let httpOptionsPush = {
      headers: new HttpHeaders({
        'Authorization': 'key=' + "AAAAcJMIL_A:APA91bGSQ142x6YOMt9_YCrwJmFMeRGRmt8DdCDNms8DzqfKL6rT72C8RP6p0hHjao3Ow8JpZV6O8hz0MLyfCojpZOHq6otdd4BkfIfO8bWlxY3ZTn3VDvM_-zoCJA6t8kUN67dPGaE7"
      })

    };
    let body = {
      "notification": {
        "title": title,
        "body": b
      },
      "to": token
    }
    return this.http.post("https://fcm.googleapis.com/fcm/send", body, httpOptionsPush);
  }

  pushNotifTokenDelete() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem("access_token")
      })

    };
    return this.http.get(this.api + "pushNotifTokenDelete", httpOptions);
  }

  nbNotif(){
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem("access_token")
      })

    };
    return this.http.get(this.api + "nbNotif",httpOptions);
  }


  getNotifs(){
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem("access_token")
      })

    };
    return this.http.get(this.api + "getNotifs",httpOptions);
  }

  deleteNotif(idNotif){
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem("access_token")
      })

    };
    return this.http.post(this.api + "deleteNotif",{idNotif},httpOptions);
  }

  nbNotifAdmin(){
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem("access_token")
      })

    };
    return this.http.get(this.api + "nbNotifAdmin",httpOptions);
  }


  getNotifsAdmin(){
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem("access_token")
      })

    };
    return this.http.get(this.api + "getNotifsAdmin",httpOptions);
  }

  deleteNotifAdmin(idNotif){
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem("access_token")
      })

    };
    return this.http.post(this.api + "deleteNotifAdmin",{idNotif},httpOptions);
  }

}
