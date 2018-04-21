import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
import { User } from 'app/_models/User';
import { UserService } from 'app/_services/user.service';
import { ToasterService } from 'angular2-toaster';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent {

    constructor(private userService: UserService, private toasterService: ToasterService) {
    }

}
