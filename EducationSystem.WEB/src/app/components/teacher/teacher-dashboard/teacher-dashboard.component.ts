import { Component, OnInit } from '@angular/core';
import { User } from 'app/_models/User';
import { UserService } from 'app/_services/user.service';
import { ToasterService } from 'angular2-toaster';

@Component({
    selector: 'teacher-dashboard',
    templateUrl: './teacher-dashboard.component.html',
    styleUrls: ['./teacher-dashboard.component.css']
})
export class TeacherDashboardComponent{

    constructor(private userService: UserService, toasterService: ToasterService) {
    }
    //TODO: to add teacher subject configuration

}
