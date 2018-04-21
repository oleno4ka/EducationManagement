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
var roles_1 = require("app/_enums/roles");
var jwt_decode_1 = require("jwt-decode");
var auth_guard_1 = require("app/_guards/auth.guard");
var RoleGuard = /** @class */ (function () {
    function RoleGuard(router, _authGuard) {
        this.router = router;
        this._authGuard = _authGuard;
        this.authGuard = _authGuard;
    }
    RoleGuard.prototype.canActivate = function (route, state) {
        // this will be passed from the route config
        // on the data property
        var expectedRole = route.data.expectedRole;
        var token = this._authGuard.token;
        console.log(expectedRole);
        console.log(this._authGuard.isAuthenticated);
        // decode the token to get its payload
        var tokenPayload = jwt_decode_1.default(token);
        console.log(this._authGuard.userRoleId + " " + tokenPayload.role);
        if (!this._authGuard.isAuthenticated) {
            this.router.navigate(['login']);
            //not logged in so redirect to login page with the return url
            this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        }
        if (tokenPayload.role !== roles_1.Roles[expectedRole]) {
            this.router.navigate(['permission-error']);
            //not logged in so redirect to login page with the return url
            this.router.navigate(['/permission-error'], { queryParams: { returnUrl: state.url } });
        }
        return this._authGuard.isAuthenticated;
    };
    RoleGuard = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [router_1.Router, auth_guard_1.AuthGuard])
    ], RoleGuard);
    return RoleGuard;
}());
exports.RoleGuard = RoleGuard;
//# sourceMappingURL=role.guard.js.map