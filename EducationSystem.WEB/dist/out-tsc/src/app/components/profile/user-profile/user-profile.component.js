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
var UserProfileComponent = /** @class */ (function () {
    function UserProfileComponent(userService, toasterService) {
        this.userService = userService;
        this.toasterService = toasterService;
        this.model = new User_1.User();
        this.loading = false;
        this.firstName = "first";
        this.successMessage = false;
    }
    UserProfileComponent.prototype.ngOnInit = function () {
        var _this = this;
        var userObs = this.userService.getCurrent().subscribe(function (user) {
            _this.model = user;
        }, function (error) { console.log("error: sidebar component"); });
    };
    UserProfileComponent.prototype.edit = function () {
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
    UserProfileComponent = __decorate([
        core_1.Component({
            selector: 'app-user-profile',
            templateUrl: './user-profile.component.html',
            styleUrls: ['./user-profile.component.css']
        }),
        __metadata("design:paramtypes", [user_service_1.UserService, angular2_toaster_1.ToasterService])
    ], UserProfileComponent);
    return UserProfileComponent;
}());
exports.UserProfileComponent = UserProfileComponent;
//# sourceMappingURL=user-profile.component.js.map