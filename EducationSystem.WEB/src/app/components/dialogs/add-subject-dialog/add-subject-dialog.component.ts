import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { Subject } from 'app/_models/Subject';

@Component({
    selector: 'add-subject-dialog',
    templateUrl: 'add-subject-dialog.component.html',
})
export class AddSubjectDialog {
    title: string;
    message: string;
    closeText: string;
    approveText: string;
    nextText: string;
    /**
     * True to show the next button. False to hide it.
     */
    model: Subject;

    constructor(
        public dialogRef: MatDialogRef<AddSubjectDialog>,
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