import { Component, OnInit, ElementRef, Input } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import { AuthGuard } from 'app/_guards/auth.guard';
import { AuthenticationService } from 'app/_services/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
    private listTitles: any[];
    location: Location;
    private toggleButton: any;
    private sidebarVisible: boolean;
    private authGuard: AuthGuard;
    private authenticationService: AuthenticationService;
    loginText: string;// = this.authGuard && this.authGuard.isAuthenticated ? "Log off" : "Log in";
    @Input() userRoleId: string;

    constructor(location: Location, private element: ElementRef, private _authGuard: AuthGuard, private _authenticationService: AuthenticationService) {
      this.location = location;
      this.sidebarVisible = false;
      this.authGuard = _authGuard;
      this.authenticationService = _authenticationService;
    }

    ngOnInit(){
      this.listTitles = ROUTES.filter(listTitle => listTitle);
      const navbar: HTMLElement = this.element.nativeElement;
      this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];
      if (this.authGuard.isAuthenticated) {
          this.loginText = "Log off"
      } else {
          this.loginText = "Log in";
      }
    }

    userRoleIdChanged(roleId: string) {
        console.log(roleId + " role is in navbar.component");
        this.userRoleId = roleId;
        console.log(roleId);
    }

    sidebarOpen() {
        const toggleButton = this.toggleButton;
        const body = document.getElementsByTagName('body')[0];
        setTimeout(function(){
            toggleButton.classList.add('toggled');
        }, 500);
        body.classList.add('nav-open');

        this.sidebarVisible = true;
    };
    sidebarClose() {
        const body = document.getElementsByTagName('body')[0];
        this.toggleButton.classList.remove('toggled');
        this.sidebarVisible = false;
        body.classList.remove('nav-open');
    };
    sidebarToggle() {
        if (this.sidebarVisible === false) {
            this.sidebarOpen();
        } else {
            this.sidebarClose();
        }
    };

    getTitle(){
      var titlee = this.location.prepareExternalUrl(this.location.path());
      if(titlee.charAt(0) === '#'){
          titlee = titlee.slice( 2 );
      }
      titlee = titlee.split('/').pop();

      for(var item = 0; item < this.listTitles.length; item++){
          if(this.listTitles[item].path === titlee){
              return this.listTitles[item].title;
          }
      }
      return 'Dashboard';
    };

    public logOut() {
        if (this.authGuard.isAuthenticated) {
            this.authenticationService.logout();
        } else {
            //this.loginText = "Log in";
        }
    };
}
