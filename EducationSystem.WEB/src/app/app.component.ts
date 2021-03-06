import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy, PopStateEvent } from '@angular/common';
import 'rxjs/add/operator/filter';
import { NavbarComponent } from './components/navigation/navbar/navbar.component';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import PerfectScrollbar from 'perfect-scrollbar';
import { TranslateService } from '@ngx-translate/core'
import { BaseTosterService } from './_services/base-toaster.service'
import { AuthenticationService } from "./_services/authentication.service";
import * as moment from 'moment';
import { ToasterService, ToasterConfig } from 'angular2-toaster';

declare const $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AuthenticationService]
})
export class AppComponent implements OnInit {
    private _router: Subscription;
    private lastPoppedUrl: string;
    private yScrollStack: number[] = [];
    public config: ToasterConfig = new ToasterConfig({
        showCloseButton: true,
        tapToDismiss: false,
        timeout: 0
    });
    private translate: TranslateService;
    private toasterService: ToasterService;
    public userRoleId: string;

    @ViewChild(NavbarComponent) navbar: NavbarComponent;

    constructor(
        public location: Location,
        private router: Router,
        translate: TranslateService,
        toasterService: ToasterService,
        private authenticationService: AuthenticationService
    ) {

        this.translate = translate;
        this.translate.setDefaultLang('en');
        this.translate.use('en');
        this.toasterService = toasterService;

        authenticationService.userLogged$.subscribe(
            roleId => {
                this.userRoleId = roleId;
                console.log(roleId+" role is in app.component");
            });
    }

    ngOnInit() {
        $.material.init();
        const elemMainPanel = <HTMLElement>document.querySelector('.main-panel');
        const elemSidebar = <HTMLElement>document.querySelector('.sidebar .sidebar-wrapper');

        this.location.subscribe((ev:PopStateEvent) => {
            this.lastPoppedUrl = ev.url;
        });
         this.router.events.subscribe((event:any) => {
            this.navbar.sidebarClose();
            if (event instanceof NavigationStart) {
               if (event.url != this.lastPoppedUrl)
                   this.yScrollStack.push(window.scrollY);
           } else if (event instanceof NavigationEnd) {
               if (event.url == this.lastPoppedUrl) {
                   this.lastPoppedUrl = undefined;
                   window.scrollTo(0, this.yScrollStack.pop());
               } else
                   window.scrollTo(0, 0);
           }
        });
        this._router = this.router.events.filter(event => event instanceof NavigationEnd).subscribe((event: NavigationEnd) => {
             elemMainPanel.scrollTop = 0;
             elemSidebar.scrollTop = 0;
        });
        if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
            let ps = new PerfectScrollbar(elemMainPanel);
            ps = new PerfectScrollbar(elemSidebar);
        }
    }
    ngAfterViewInit() {
        this.runOnRouteChange();
    }
    
    runOnRouteChange(): void {
      if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
        const elemMainPanel = <HTMLElement>document.querySelector('.main-panel');
        const ps = new PerfectScrollbar(elemMainPanel);
        ps.update();
      }
    }
    isMac(): boolean {
        let bool = false;
        if (navigator.platform.toUpperCase().indexOf('MAC') >= 0 || navigator.platform.toUpperCase().indexOf('IPAD') >= 0) {
            bool = true;
        }
        return bool;
    }
    useLanguage(language: string) {
        this.translate.use(language);
    }
}
