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
var User_1 = require("app/_models/User");
var angular2_toaster_1 = require("angular2-toaster");
var EditUserFormComponent = /** @class */ (function () {
    function EditUserFormComponent(userService, toasterService) {
        this.userService = userService;
        this.toasterService = toasterService;
        this.loading = false;
        this.successMessage = false;
        this.myOptions = [
            { label: 'Student', value: '3' },
            { label: 'Teacher', value: '2' }
        ];
    }
    EditUserFormComponent.prototype.ngOnInit = function () {
    };
    EditUserFormComponent.prototype.edit = function () {
        var _this = this;
        this.loading = true;
        this.userService.edit(this.model)
            .subscribe(function (data) {
            _this.successMessage = true;
            _this.toasterService.pop('success', 'Success', 'User was updated');
            _this.loading = false;
        }, function (error) {
            _this.successMessage = false;
            _this.toasterService.pop('error', 'Error', 'Error occured');
            _this.loading = false;
        });
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", User_1.User)
    ], EditUserFormComponent.prototype, "model", void 0);
    EditUserFormComponent = __decorate([
        core_1.Component({
            selector: 'edit-user-form',
            templateUrl: './edit-user-form.component.html',
            styleUrls: ['./edit-user-form.component.css']
        }),
        __metadata("design:paramtypes", [user_service_1.UserService, angular2_toaster_1.ToasterService])
    ], EditUserFormComponent);
    return EditUserFormComponent;
}());
exports.EditUserFormComponent = EditUserFormComponent;
//# sourceMappingURL=edit-user-form.component.js.map