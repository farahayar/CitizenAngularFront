import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {
  b;
  constructor(private _us: UserService, private router: Router) {
    this._us.isLoggedIn().subscribe((res) => {
      this.b = res;

    });
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (this._us.isLoggedIn()) {

      return true;
    }
    else
      this.router.navigate(['/visiteur']);
    return false;
  }


}
