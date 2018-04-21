import { Component, OnInit, Inject } from '@angular/core';
import { UserService } from 'app/_services/user.service';
import { ToasterService } from 'angular2-toaster';
import { User } from 'app/_models/User';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'info-dialog',
    templateUrl: 'info-dialog.component.html',
})
export class InfoDialog {
    title: string;
    message: string;
    closeText: string;
    approveText: string;
    nextText: string;
    enableNext: boolean;
    constructor(
        public dialogRef: MatDialogRef<InfoDialog>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        this.title = data.title;
        this.message = data.message;
        this.closeText = data.closeText;
        this.nextText = data.customText;
        this.approveText = data.approveText;
       // this.enableNext = HIDE_NEXT_BUTTON;
    }

    onCloseClick(): void {
        this.dialogRef.close();
    }
}