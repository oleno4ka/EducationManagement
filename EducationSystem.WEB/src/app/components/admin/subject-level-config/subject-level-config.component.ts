import { Component, OnInit } from '@angular/core';
import { Level } from 'app/_models/Level';
import { Subject } from 'app/_models/Subject';
import { SubjectLevelService } from 'app/_services/subjectlevel.service';
import { MatDialog } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToasterService } from 'angular2-toaster';
import { AddSubjectDialog } from 'app/components/dialogs/add-subject-dialog/add-subject-dialog.component';

@Component({
    selector: 'subject-level-config',
  templateUrl: './subject-level-config.component.html',
  styleUrls: ['./subject-level-config.component.css']
})
export class SubjectLevelConfigComponent implements OnInit {
    loadingEdit: boolean;
    toasterService: ToasterService;
    public levels: Level[];
    public subjectModel: Subject = new Subject();
    public subjects: Subject[];
    constructor(private subjectLevelService: SubjectLevelService, public dialog: MatDialog, private _toasterService: ToasterService) {
        this.toasterService = _toasterService;
    }

    ngOnInit() {
        var subscription = this.subjectLevelService.getSubjects().subscribe(
            subjectsList => {
                this.subjects = subjectsList;
            },
            error => { console.log("error: subject-level-config component"); });
    }

    addNewSubjectDialogOpen() {
        let dialogRef = this.dialog.open(AddSubjectDialog, {

            data: {
                title: "subject_level.add_subject.title",
                message: "subject_level.add_subject.message",
                closeText: "subject_level.add_subject.close_text",
                approveText: "subject_level.add_subject.approve_text",
                model: this.subjectModel
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            console.log(result);
            if (result) {
                this.addNewSubject(result);
            }
        });
    }

    addNewSubject(model : Subject) {
        console.log("addNewSubject: " + model);
        this.loadingEdit = true;
        this.subjectLevelService.addSubject(model)
            .subscribe(
            data => {
                this.toasterService.pop('success', 'Success', 'Subject was added! You can now add levels for it.');
                this.loadingEdit = false;
            },
            error => {
                this.toasterService.pop('error', 'Error', 'Error while adding subject occured :(');
                this.loadingEdit = false;
            });
    }

}
