import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { AuthenticationService } from '../../../services/authentication.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  loginPage = true;
  connectedRole = null;
  connectedUser: User = null;
  username: string;
  authenticated = false;

  constructor(
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer,
    private authService: AuthenticationService,
    private router: Router
  ) {
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.authenticated = this.isAuthenticated();
        if (this.authenticated) {
          this.connectedUser = this.authService.getConnectedUser();
          this.connectedRole = this.connectedUser.role.roleCode;
        }
      }
    });
    this.initMenu();
  }

  ngOnInit() {
  }

  isAuthenticated() {
    const authenticated = this.authService.isAuthenticated();
    if (authenticated) {
      const user = this.connectedUser;
      if (user) {
        this.username = user.account.username;
      }
    }
    return authenticated;
  }

  initMenu() {
    this.router.events.subscribe(val => {
      if (val instanceof NavigationEnd) {
        if (this.router.routerState.snapshot.url === "/signup") {
          this.loginPage = false;
        } else {
          this.loginPage = true;
        }
      }
    })
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['']);
  }
}
