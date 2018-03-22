import { Component, OnInit, Inject } from '@angular/core';
import { UserService } from 'app/_services/user.service';
import { ToasterService } from 'angular2-toaster';
import { User } from 'app/_models/User';
import { MatDialog } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { InfoDialog } from 'app/info-dialog/info-dialog.component';
import { EditDialog } from 'app/edit-dialog/edit-dialog.component';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
    loadingEdit: boolean = false;
    loadingDelete: boolean = false;

    users: User[];
    userService: UserService;
    private toasterService: ToasterService;

    constructor(private _userService: UserService, _toasterService: ToasterService, public dialog: MatDialog) {
        this.userService = _userService;
        this.toasterService = _toasterService;
    }

  ngOnInit() {
      var userObs = this.userService.getList().subscribe(
          usersList => {
              this.users = usersList;
          },
          error => { console.log("error: sidebar component"); });
  }

  removeUser(id: string) {
      this.loadingDelete = true;
      this.userService.remove(id)
          .subscribe(
          data => {
              this.toasterService.pop('success', 'Success', 'User was deleted');
              this.loadingDelete = false;
          },
          error => {
              this.toasterService.pop('error', 'Error', 'Error occured');
              this.loadingDelete = false;
          });
  }

  editUser(model) {
      this.loadingEdit = true;
      //this.userService.editUserListItem(model)
      //    .subscribe(
      //    data => {
      //        this.toasterService.pop('success', 'Success', 'User was deleted');
      //        this.loadingEdit = false;
      //    },
      //    error => {
      //        this.toasterService.pop('error', 'Error', 'Error occured');
      //        this.loadingEdit = false;
      //    });
  }

  removeUserDialogOpen(id: string, name: string) : void{
      let dialogRef = this.dialog.open(InfoDialog, {

          data: {
              title: "dialog.remove_user.title",
              message: "dialog.remove_user.message",
              closeText: "dialog.remove_user.close_text",
              customText: name,
              approveText: "dialog.remove_user.approveText"}
      });

      dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
          console.log(result);
          if (result) {
              this.removeUser(id);
          }
      });
  }

  editUserDialogOpen(model: User): void {
      let dialogRef = this.dialog.open(EditDialog, {

          data: {
              title: "dialog.edit_user.title",
              message: "dialog.edit_user.message",
              closeText: "dialog.edit_user.close_text",
              customText: name,
              model: model,
              approveText: "dialog.edit_user.approveText"
          }
      });

      dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
          console.log(result);
          if (result) {
              this.editUser(result);
          }
      });
  }
}
