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
var router_1 = require("@angular/router");
var jwt_decode_1 = require("jwt-decode");
var AuthGuard = /** @class */ (function () {
    function AuthGuard(router) {
        this.router = router;
    }
    Object.defineProperty(AuthGuard.prototype, "currentUser", {
        get: function () { return localStorage.getItem('currentUser') !== null ? JSON.parse(localStorage.getItem('currentUser')) : null; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AuthGuard.prototype, "userId", {
        get: function () { return this.currentUser !== null ? this.currentUser.id : null; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AuthGuard.prototype, "userRoleId", {
        get: function () {
            console.log(jwt_decode_1.default(this.currentUser.token).role);
            return (this.currentUser !== null && this.currentUser.token !== null) ? jwt_decode_1.default(this.currentUser.token).role : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AuthGuard.prototype, "token", {
        get: function () { return this.currentUser !== null ? this.currentUser.token : null; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AuthGuard.prototype, "isAuthenticated", {
        get: function () { return this.token !== null; },
        enumerable: true,
        configurable: true
    });
    ;
    AuthGuard.prototype.canActivate = function (route, state) {
        var expectedRole = route.data.expectedRole;
        if (this.isAuthenticated) {
            // logged in so return true
            console.log(this.currentUser);
        }
        else {
            // not logged in so redirect to login page with the return url
            this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        }
        return this.isAuthenticated;
    };
    AuthGuard = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [router_1.Router])
    ], AuthGuard);
    return AuthGuard;
}());
exports.AuthGuard = AuthGuard;
//# sourceMappingURL=auth.guard.js.map