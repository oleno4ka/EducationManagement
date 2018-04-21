import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthenticationService } from 'app/_services/authentication.service';
import { ToasterConfig, ToasterService, Toast } from "angular2-toaster/angular2-toaster";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})

export class LoginPageComponent implements OnInit {

    error: any = {};
    model: any = {};
    loading = false;
    returnUrl: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
    ) { }

    public config1: ToasterConfig = new ToasterConfig({
        positionClass: 'toast-top-right'
    });

    ngOnInit() {

        this.authenticationService.logout();
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    login() {
        this.loading = true;
        this.authenticationService.login(this.model)
            .subscribe(
            result => {
                this.router.navigate([this.returnUrl]);
            },
            response => {
                this.error = response.error;
                this.loading = false;
            });
    }

}
