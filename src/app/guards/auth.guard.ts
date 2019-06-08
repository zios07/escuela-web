import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import 'rxjs/add/observable/of';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(router: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    let activate = false;
    const jwtHelper = new JwtHelperService();
    const token = localStorage.getItem('token');
    if (token) {
      activate = !jwtHelper.isTokenExpired(token);
    }
    if (activate) {
      return activate;
    }
    this.router.navigate([''], { queryParams: { src: state.url } });
    return false;
  }
}