import { Component, OnInit, Inject } from '@angular/core';
import { UserService } from 'app/_services/user.service';
import { ToasterService } from 'angular2-toaster';
import { User } from 'app/_models/User';
import { MatDialog } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'edit-dialog',
    templateUrl: 'edit-dialog.component.html',
})
export class EditDialog {
    title: string;
    message: string;
    closeText: string;
    approveText: string;
    nextText: string;
    model: User;

    constructor(
        public dialogRef: MatDialogRef<EditDialog>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        this.title = data.title;
        this.message = data.message;
        this.closeText = data.closeText;
        this.nextText = data.customText;
        this.approveText = data.approveText;
       // this.enableNext = HIDE_NEXT_BUTTON;
        this.model = data.model;
    }

    onCloseClick(): void {
        this.dialogRef.close();
    }
}