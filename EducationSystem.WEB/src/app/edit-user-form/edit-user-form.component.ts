import { Component, OnInit } from '@angular/core';
import { UserService } from 'app/_services/user.service';
import { User } from 'app/_models/User';
import { Roles } from 'app/_enums/roles';
import { ToasterService } from 'angular2-toaster';

@Component({
    selector: 'edit-user-form',
    templateUrl: './edit-user-form.component.html',
    styleUrls: ['./edit-user-form.component.css']
})
export class EditUserFormComponent implements OnInit {
    model: User = new User();
    loading = false;
    userService: UserService;
    private toasterService: ToasterService;
    successMessage: boolean = false;

    constructor(private _userService: UserService, toasterService: ToasterService, model: User) {
        this.userService = _userService;
        this.toasterService = toasterService;
        this.model = model;
    }

    ngOnInit() {
        //var userObs = this.userService.getCurrent().subscribe(
        //    user => {
        //        this.model = user;
        //    },
        //    error => { console.log("error: sidebar component"); });
    }

    edit() {
        this.loading = true;
        this.userService.edit(this.model)
            .subscribe(
            data => {
                this.successMessage = true;
                this.toasterService.pop('success', 'Success', 'User was updated');
                this.loading = false;
            },
            error => {
                this.successMessage = false;
                this.toasterService.pop('error', 'Error','Error occured');
                this.loading = false;
            });
    }
}
