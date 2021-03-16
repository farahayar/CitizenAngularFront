import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { UserModule } from '../models/user/user.module';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(private http: HttpClient) { }
  private api = "http://localhost:8000/api/auth/";

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  addUser(user: FormData, motDePass_confirmation) {
    return this.http.post(this.api + "signup", {user,motDePass_confirmation});
  }
  /*
  addUser(user: FormData,motDePasse_confirmation){
    return this.http.post(this.api+"signup", {user,motDePasse_confirmation});
  }*/
  loginUser(user) {
    return this.http.post<any>(this.api + "login", user);
  }

  getCurrenUser() {

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem("access_token")
      })

    };
    return this.http.get(this.api + "getCurrenUser", httpOptions);

  }

  getImage() {

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem("access_token")
      })

    };
    return this.http.get(this.api + "getImage", httpOptions);

  }

  getValidePosts() {

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem("access_token")
      })

    };
    return this.http.get(this.api + "getValidePosts", httpOptions);

  }

  getDetailsPost(idPost) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem("access_token")
      })

    };
    return this.http.post(this.api + "getDetailsPost", {idPost}, httpOptions);

  }

  userModifPost(modifPost) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem("access_token")
      })

    };
    return this.http.post(this.api + "userModifPost", {modifPost},httpOptions);

  }

  userSignalePost(signalPost) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem("access_token")
      })

    };
    return this.http.post(this.api + "userSignalePost", {signalPost},httpOptions);

  }
  userSignaleUser(signalUser) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem("access_token")
      })

    };
    return this.http.post(this.api + "userSignaleUser", {signalUser},httpOptions);

  }
  refuserUserSignale(idSign) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem("access_token")
      })

    };
    return this.http.post(this.api + "refuserUserSignale", {idSign}, httpOptions);

  }
  getDetailsPost2(idPost) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem("access_token")
      })

    };
    return this.http.post(this.api + "getDetailsPost2", {idPost}, httpOptions);

  }

  logout() {

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem("access_token")
      })

    };
    return this.http.get(this.api + "logout", httpOptions);

  }

  getUserPosts(idUser) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem("access_token")
      })

    };
    return this.http.post(this.api + "getUserPosts",{idUser}, httpOptions);

  }

  modifUser(user) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem("access_token")
      })

    };
    return this.http.post(this.api + "modifUser",{user}, httpOptions);

  }

  modifImageUser(userim: FormData) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem("access_token")
      })

    };
    return this.http.post(this.api + "modifImageUser",userim, httpOptions);

  }

  getUserPw(idUser) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem("access_token")
      })

    };
    return this.http.post(this.api + "getUserPw",{idUser}, httpOptions);

  }

  getUserById(idUser) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem("access_token")
      })

    };
    return this.http.post(this.api + "getUserById",{idUser}, httpOptions);

  }

  getSumPostsUser(idUser) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem("access_token")
      })

    };
    return this.http.post(this.api + "getSumPostsUser",{idUser}, httpOptions);

  }

  getSumAbonnementsUser(idUser) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem("access_token")
      })

    };
    return this.http.post(this.api + "getSumAbonnementsUser",{idUser}, httpOptions);

  }
  getSumSuivitsUser(idUser) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem("access_token")
      })

    };
    return this.http.post(this.api + "getSumSuivitsUser",{idUser}, httpOptions);

  }

  followUser(ids) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem("access_token")
      })

    };
    return this.http.post(this.api + "followUser",{ids}, httpOptions);

  }

  ifCurrentUFollowsUser(ids) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem("access_token")
      })

    };
    return this.http.post(this.api + "ifCurrentUFollowsUser",{ids}, httpOptions);

  }

  unFollowUser(ids) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem("access_token")
      })

    };
    return this.http.post(this.api + "unFollowUser",{ids}, httpOptions);

  }

  userEnregistrerPost(enregistrerPost) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem("access_token")
      })

    };
    return this.http.post(this.api + "userEnregistrerPost",{enregistrerPost}, httpOptions);

  }

  getEnregistrerPosts(idUser) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem("access_token")
      })

    };
    return this.http.post(this.api + "getEnregistrerPosts",{idUser}, httpOptions);

  }

  deletePost(deletePost) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem("access_token")
      })

    };
    return this.http.post(this.api + "deletePost",{deletePost}, httpOptions);

  }

  deletePostEnregistrer(deletePostEnregistrer) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem("access_token")
      })

    };
    return this.http.post(this.api + "deletePostEnregistrer",{deletePostEnregistrer}, httpOptions);

  }

  ifCurrentUSignaledUser(ids) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem("access_token")
      })

    };
    return this.http.post(this.api + "ifCurrentUSignaledUser",{ids}, httpOptions);

  }

  getAllUsersNames() {

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem("access_token")
      })

    };
    return this.http.get(this.api + "getAllUsersNames", httpOptions);

  }
  getValideUserPosts(idUser){
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem("access_token")
      })

    };
    return this.http.post(this.api + "getValideUserPosts", {idUser},httpOptions);
  }

  getStoryUser() {

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem("access_token")
      })

    };
    return this.http.get(this.api + "getStoryUser", httpOptions);

  }

  getStoryUserId(idUser) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem("access_token")
      })

    };
    return this.http.post(this.api + "getStoryUserId",{idUser}, httpOptions);

  }

  getAllUsersNames2() {

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem("access_token")
      })

    };
    return this.http.get(this.api + "getAllUsersNames2", httpOptions);

  }

  getAbonneUsers() {

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem("access_token")
      })

    };
    return this.http.get(this.api + "getAbonneUsers", httpOptions);

  }

  getSuiviUsers() {

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem("access_token")
      })

    };
    return this.http.get(this.api + "getSuiviUsers", httpOptions);

  }

  isLoggedIn(){
    console.log("aaa");
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem("access_token")
      })

    };
    return this.http.get(this.api + "isLoggedIn", httpOptions);
  }

  ifPostBelongsUser(idPost) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem("access_token")
      })

    };
    return this.http.post(this.api + "ifPostBelongsUser",{idPost}, httpOptions);

  }

  ifUserExists(idUser) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem("access_token")
      })

    };
    return this.http.post(this.api + "ifUserExists",{idUser}, httpOptions);

  }



}
