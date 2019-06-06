import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private router: Router) { }

  ROLE_ADMIN: string = "ROLE_ADMIN";

  canActivate(next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {

    let activate = false;
    let jwtHelper = new JwtHelperService();
    var token = localStorage.getItem('token');
    var decodedToken = jwtHelper.decodeToken(token);
    if (decodedToken.role && decodedToken.role.indexOf(this.ROLE_ADMIN) > -1)
      return true;
    this.router.navigate(['']);
    return false;
  }
}
