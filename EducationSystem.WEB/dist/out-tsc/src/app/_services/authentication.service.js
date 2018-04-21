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
var Subject_1 = require("rxjs/Subject");
var auth_guard_1 = require("app/_guards/auth.guard");
var Headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json', 'withCredentials': 'true' });
var AuthenticationService = /** @class */ (function () {
    function AuthenticationService(http, authGuard) {
        this.http = http;
        this.authGuard = authGuard;
        this.userLoggedSource = new Subject_1.Subject();
        this.userLogged$ = this.userLoggedSource.asObservable();
        this.BASEURL = environment_1.environment.baseApi;
        this.authGuard = authGuard;
    }
    AuthenticationService.prototype.register = function (model) {
        var _this = this;
        return this.http.post(this.BASEURL + 'api/account/register', model, { headers: Headers })
            .map(function (response) {
            var user = response;
            if (user && user.token) {
                localStorage.setItem('currentUser', JSON.stringify(user));
                _this.userLoggedSource.next(_this.authGuard.userRoleId);
            }
            return user;
        });
    };
    AuthenticationService.prototype.login = function (model) {
        var _this = this;
        return this.http.post(this.BASEURL + 'api/account/login', model, { headers: Headers })
            .map(function (response) {
            var user = response;
            if (user && user.token) {
                localStorage.setItem('currentUser', JSON.stringify(user));
                _this.userLoggedSource.next(_this.authGuard.userRoleId);
            }
            return user;
        });
    };
    AuthenticationService.prototype.logout = function () {
        localStorage.removeItem('currentUser');
    };
    AuthenticationService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient, auth_guard_1.AuthGuard])
    ], AuthenticationService);
    return AuthenticationService;
}());
exports.AuthenticationService = AuthenticationService;
//# sourceMappingURL=authentication.service.js.map