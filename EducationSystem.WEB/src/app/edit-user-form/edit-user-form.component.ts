import { Component, OnInit, Input } from '@angular/core';
import { UserService } from 'app/_services/user.service';
import { User } from 'app/_models/User';
import { Roles } from 'app/_enums/roles';
import { ToasterService } from 'angular2-toaster';
import { IOption } from 'ng-select';

@Component({
    selector: 'edit-user-form',
    templateUrl: './edit-user-form.component.html',
    styleUrls: ['./edit-user-form.component.css']
})
export class EditUserFormComponent implements OnInit {
    @Input() model: User ;
    loading = false;
    userService: UserService;
    private toasterService: ToasterService;
    successMessage: boolean = false;
    myOptions: Array<IOption> = [
        { label: 'Student', value: '3' },
        { label: 'Teacher', value: '2' }
    ];

    constructor(private _userService: UserService, toasterService: ToasterService) {
        this.userService = _userService;
        this.toasterService = toasterService;
    }

    ngOnInit() {
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
