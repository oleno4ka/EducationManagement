import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
import { User } from 'app/_models/User';
import { UserService } from 'app/_services/user.service';
import { ToasterService } from 'angular2-toaster';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

    constructor(private _userService: UserService, private _toasterService: ToasterService) {
    }
  ngOnInit() {

  }

}
