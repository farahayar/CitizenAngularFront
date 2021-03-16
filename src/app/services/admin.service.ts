import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  constructor(private http: HttpClient) { }


  private api = "http://localhost:8000/api/auth/";

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getInvalidePosts() {

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem("access_token")
      })

    };
    return this.http.get(this.api + "getInvalidePosts", httpOptions);

  }

  getDetailsPost(idPost) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem("access_token")
      })

    };
    return this.http.post(this.api + "getDetailsPost", {idPost}, httpOptions);

  }

  validPost(idPost) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem("access_token")
      })

    };
    return this.http.post(this.api + "validPost", {idPost}, httpOptions);

  }

  refusePost(idPost) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem("access_token")
      })

    };
    return this.http.post(this.api + "refusePost", {idPost}, httpOptions);

  }

  getModifPosts() {

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem("access_token")
      })

    };
    return this.http.get(this.api + "getModifPosts", httpOptions);

  }
  ModifierPost(idModif) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem("access_token")
      })

    };
    return this.http.post(this.api + "ModifierPost", {idModif}, httpOptions);

  }

  refusePostModification(idModPost) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem("access_token")
      })

    };
    return this.http.post(this.api + "refusePostModification", {idModPost}, httpOptions);

  }

  getSignalPosts() {

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem("access_token")
      })

    };
    return this.http.get(this.api + "getSignalPosts", httpOptions);

  }

  signalerPost(idSign) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem("access_token")
      })

    };
    return this.http.post(this.api + "signalerPost", {idSign}, httpOptions);

  }

  refuserPostSignale(idSign) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem("access_token")
      })

    };
    return this.http.post(this.api + "refuserPostSignale", {idSign}, httpOptions);

  }

  getSignalUsers() {

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem("access_token")
      })

    };
    return this.http.get(this.api + "getSignalUsers", httpOptions);

  }

  signalerUser(idSign) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem("access_token")
      })

    };
    return this.http.post(this.api + "signalerUser", {idSign}, httpOptions);

  }

  getAllUsers() {

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem("access_token")
      })

    };
    return this.http.post(this.api + "getAllUsers", httpOptions);

  }

  

  getUserById(idUser) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem("access_token")
      })

    };
    return this.http.post(this.api + "getUserById",{idUser}, httpOptions);

  }

  deleteUserById(idUser) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem("access_token")
      })

    };
    return this.http.post(this.api + "deleteUserById",{idUser}, httpOptions);

  }

  valideUserToAdmin(idUser) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem("access_tokenS")
      })

    };
    return this.http.post(this.api + "valideUserToAdmin",{idUser}, httpOptions);

  }

  unValideAdminToUser(idUser) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem("access_tokenS")
      })

    };
    return this.http.post(this.api + "unValideAdminToUser",{idUser}, httpOptions);

  }

  isLoggedAdmin(){
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem("access_token")
      })

    };
    return this.http.get(this.api + "isLoggedAdmin", httpOptions);
  }
}
