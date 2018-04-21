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
require("rxjs/add/operator/map");
var environment_1 = require("../../environments/environment");
var http_1 = require("@angular/common/http");
var User_1 = require("app/_models/User");
var Headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json', 'withCredentials': 'true' });
var UserService = /** @class */ (function () {
    function UserService(http) {
        this.http = http;
        this.user = new User_1.User();
        this.BASEURL = environment_1.environment.baseApi;
    }
    UserService.prototype.getById = function (id) {
        return this.http.get(this.BASEURL + 'api/users/getUser/' + id, { headers: Headers }).map(function (user) {
            return new User_1.User(user.id, user.firstName, user.lastName, user.middleName, user.phoneNumber, user.email, user.dateOfBirth, user.dateRegistered, user.profilePictureUrl, user.roleId);
        });
    };
    UserService.prototype.getCurrent = function () {
        return this.http.get(this.BASEURL + 'api/users/getUser/current', { headers: Headers })
            .map(function (user) {
            return new User_1.User(user.id, user.firstName, user.lastName, user.middleName, user.phoneNumber, user.email, user.dateOfBirth, user.dateRegistered, user.profilePictureUrl, user.roleId);
        });
    };
    UserService.prototype.getList = function () {
        return this.http.get(this.BASEURL + 'api/users/getUsers/', { headers: Headers })
            .map(function (res) {
            return res.map(function (user) {
                return new User_1.User(user.id, user.firstName, user.lastName, user.middleName, user.phoneNumber, user.email, user.dateOfBirth, user.dateRegistered, user.profilePictureUrl, user.roleId);
            });
        });
    };
    UserService.prototype.editUserListItem = function (model) {
        return this.http.post(this.BASEURL + 'api/users/editUser', model, { headers: Headers })
            .map(function (response) {
            var user = response;
            return user;
        });
    };
    UserService.prototype.edit = function (model) {
        return this.http.post(this.BASEURL + 'api/users/edit', model, { headers: Headers })
            .map(function (response) {
            var user = response;
            return user;
        });
    };
    UserService.prototype.remove = function (id) {
        return this.http.post(this.BASEURL + 'api/users/remove?id=' + id, { headers: Headers })
            .map(function (response) {
            return response;
        });
    };
    UserService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], UserService);
    return UserService;
}());
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map