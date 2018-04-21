import { Component, OnInit } from '@angular/core';
import { UserService } from 'app/_services/user.service';
import { ToasterService } from 'angular2-toaster';

@Component({
    selector: 'permission-error',
  //templateUrl: './permission-error.component.html',
    styleUrls: ['./permission-error.component.css'],
    template: '<p style="min-height:100px; margin:50px;">Permission error!</p>'
})
export class PermissionErrorComponent {
}
