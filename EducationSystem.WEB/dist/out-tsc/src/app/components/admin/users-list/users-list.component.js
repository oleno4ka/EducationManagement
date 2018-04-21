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
var user_service_1 = require("app/_services/user.service");
var angular2_toaster_1 = require("angular2-toaster");
var dialog_1 = require("@angular/material/dialog");
var info_dialog_component_1 = require("app/components/dialogs/info-dialog/info-dialog.component");
var edit_dialog_component_1 = require("app/components/dialogs/edit-dialog/edit-dialog.component");
var UsersListComponent = /** @class */ (function () {
    function UsersListComponent(userService, toasterService, dialog) {
        this.userService = userService;
        this.toasterService = toasterService;
        this.dialog = dialog;
        this.loadingEdit = false;
        this.loadingDelete = false;
        this.isEditOpen = false;
    }
    UsersListComponent.prototype.ngOnInit = function () {
        var _this = this;
        var userObs = this.userService.getList().subscribe(function (usersList) {
            _this.users = usersList;
        }, function (error) { console.log("error: sidebar component"); });
    };
    UsersListComponent.prototype.removeUser = function (id) {
        var _this = this;
        this.loadingDelete = true;
        this.userService.remove(id)
            .subscribe(function (data) {
            _this.toasterService.pop('success', 'Success', 'User was deleted');
            _this.loadingDelete = false;
        }, function (error) {
            _this.toasterService.pop('error', 'Error', 'Error occured');
            _this.loadingDelete = false;
        });
    };
    UsersListComponent.prototype.editUser = function (model) {
        var _this = this;
        this.loadingEdit = true;
        this.userService.editUserListItem(model)
            .subscribe(function (data) {
            _this.toasterService.pop('success', 'Success', 'User was deleted');
            _this.loadingEdit = false;
        }, function (error) {
            _this.toasterService.pop('error', 'Error', 'Error occured');
            _this.loadingEdit = false;
        });
    };
    UsersListComponent.prototype.removeUserDialogOpen = function (model, index) {
        var _this = this;
        var dialogRef = this.dialog.open(info_dialog_component_1.InfoDialog, {
            data: {
                title: "dialog.remove_user.title",
                message: "dialog.remove_user.message",
                closeText: "dialog.remove_user.close_text",
                customText: model.FullNameString,
                approveText: "dialog.remove_user.approveText"
            }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log('The dialog was closed');
            console.log(result);
            if (result) {
                _this.removeUser(model.id);
                _this.users.slice(index);
            }
        });
    };
    UsersListComponent.prototype.editUserDialogOpen = function (model) {
        var _this = this;
        this.editableUser = model;
        var dialogRef = this.dialog.open(edit_dialog_component_1.EditDialog, {
            data: {
                title: "dialog.edit_user.title",
                message: "dialog.edit_user.message",
                closeText: "dialog.edit_user.close_text",
                customText: model.FullNameString,
                model: this.editableUser,
                approveText: "dialog.edit_user.approveText"
            }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log('The dialog was closed');
            console.log(result);
            if (result) {
                _this.editUser(result);
            }
        });
    };
    UsersListComponent = __decorate([
        core_1.Component({
            selector: 'app-users-list',
            templateUrl: './users-list.component.html',
            styleUrls: ['./users-list.component.css']
        }),
        __metadata("design:paramtypes", [user_service_1.UserService, angular2_toaster_1.ToasterService, dialog_1.MatDialog])
    ], UsersListComponent);
    return UsersListComponent;
}());
exports.UsersListComponent = UsersListComponent;
//# sourceMappingURL=users-list.component.js.map