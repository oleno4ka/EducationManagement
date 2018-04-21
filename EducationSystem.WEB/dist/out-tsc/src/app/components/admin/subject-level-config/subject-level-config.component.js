"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var Subject_1 = require("app/_models/Subject");
var subjectlevel_service_1 = require("app/_services/subjectlevel.service");
var material_1 = require("@angular/material");
var angular2_toaster_1 = require("angular2-toaster");
var add_subject_dialog_component_1 = require("app/components/dialogs/add-subject-dialog/add-subject-dialog.component");
var SubjectLevelConfigComponent = /** @class */ (function () {
    function SubjectLevelConfigComponent(subjectLevelService, dialog, toasterService) {
        this.subjectLevelService = subjectLevelService;
        this.dialog = dialog;
        this.toasterService = toasterService;
        this.subjectModel = new Subject_1.Subject();
    }
    SubjectLevelConfigComponent.prototype.ngOnInit = function () {
        var _this = this;
        var subscription = this.subjectLevelService.getSubjects().subscribe(function (subjectsList) {
            _this.subjects = subjectsList;
        }, function (error) { console.log("error: subject-level-config component"); });
    };
    SubjectLevelConfigComponent.prototype.addNewSubjectDialogOpen = function () {
        var _this = this;
        var dialogRef = this.dialog.open(add_subject_dialog_component_1.AddSubjectDialog, {
            data: {
                title: "subject_level.add_subject.title",
                message: "subject_level.add_subject.message",
                closeText: "subject_level.add_subject.close_text",
                approveText: "subject_level.add_subject.approve_text",
                model: this.subjectModel
            }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log('The dialog was closed');
            console.log(result);
            if (result) {
                _this.addNewSubject(result);
            }
        });
    };
    SubjectLevelConfigComponent.prototype.addNewSubject = function (model) {
        var _this = this;
        console.log("addNewSubject: " + model);
        this.loadingEdit = true;
        this.subjectLevelService.addSubject(model)
            .subscribe(function (data) {
            _this.toasterService.pop('success', 'Success', 'Subject was added! You can now add levels for it.');
            _this.loadingEdit = false;
        }, function (error) {
            _this.toasterService.pop('error', 'Error', 'Error while adding subject occured :(');
            _this.loadingEdit = false;
        });
    };
    SubjectLevelConfigComponent = __decorate([
        core_1.Component({
            selector: 'subject-level-config',
            templateUrl: './subject-level-config.component.html',
            styleUrls: ['./subject-level-config.component.css']
        }),
        __metadata("design:paramtypes", [subjectlevel_service_1.SubjectLevelService, material_1.MatDialog, angular2_toaster_1.ToasterService])
    ], SubjectLevelConfigComponent);
    return SubjectLevelConfigComponent;
}());
exports.SubjectLevelConfigComponent = SubjectLevelConfigComponent;
//# sourceMappingURL=subject-level-config.component.js.map