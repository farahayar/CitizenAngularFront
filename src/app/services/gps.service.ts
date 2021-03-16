import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class GpsService {
  constructor(private http: HttpClient) { }


  private api = "http://localhost:8000/api/auth/";
  private _Reverselocals = "https://nominatim.openstreetmap.org/reverse?format=jsonv2";
  reverseSeach(lat, lon) {
    return this.http.get<any>(this._Reverselocals + "&lat=" + lat + "&lon=" + lon);
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  addPost(post: FormData) {
    
    const httpOptions = {
      headers: new HttpHeaders({
      'Authorization': 'Bearer '+localStorage.getItem("access_token")
     })
  
    };
      return this.http.post(this.api + "addPost",post,httpOptions);
  
  }
  

}
