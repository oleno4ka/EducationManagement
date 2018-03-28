import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes, Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'app/_services/authentication.service';
import { Http, Response, RequestOptions, RequestOptionsArgs, Headers } from '@angular/http';
import { RoleService } from 'app/_services/role.service';
import { IOption } from 'ng-select';
//models
import { Role } from 'app/_models/Role';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})

export class RegisterPageComponent implements OnInit {

    model: any = {};
    loading = false;
    returnUrl: string;
    roles: Role[] = [];
    roleOptions: Array<IOption>;
    myOptions: Array<IOption> = [
        { label: 'Student', value: '3' },
        { label: 'Teacher', value: '2' }
    ];

    constructor(
        private http: Http,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private roleService: RoleService) {

        this.roleService.getRoles().subscribe(roles => {
            this.roles = roles;
        });
    }

    register() {
        this.loading = true;
        this.authenticationService.register(this.model)
            .subscribe(
            data => {
                this.router.navigate(['/dashboard']);
            },
            error => {
                this.loading = false;
            });
    }

    ngOnInit() {
    }

}
