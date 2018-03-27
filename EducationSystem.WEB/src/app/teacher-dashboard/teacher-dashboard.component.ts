import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
import { User } from 'app/_models/User';
import { UserService } from 'app/_services/user.service';
import { ToasterService } from 'angular2-toaster';

@Component({
    selector: 'teacher-dashboard',
  //templateUrl: './teacher-dashboard.component.html',
    styleUrls: ['./teacher-dashboard.component.css'],
    template: '<p style="min-height:100px; margin:50px;">Teacher Dashboard!</p>'
})
export class TeacherDashboardComponent implements OnInit {

    
    userService: UserService;
    private toasterService: ToasterService;

    constructor(private _userService: UserService, _toasterService: ToasterService) {
        this.userService = _userService;
        this.toasterService = _toasterService;
    }

  ngOnInit() {

  }

}
