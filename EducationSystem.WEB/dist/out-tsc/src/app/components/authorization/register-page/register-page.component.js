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
var authentication_service_1 = require("app/_services/authentication.service");
var http_1 = require("@angular/http");
var role_service_1 = require("app/_services/role.service");
var RegisterPageComponent = /** @class */ (function () {
    function RegisterPageComponent(http, route, router, authenticationService, roleService) {
        var _this = this;
        this.http = http;
        this.route = route;
        this.router = router;
        this.authenticationService = authenticationService;
        this.roleService = roleService;
        this.model = {};
        this.loading = false;
        this.roles = [];
        this.myOptions = [
            { label: 'Student', value: '3' },
            { label: 'Teacher', value: '2' }
        ];
        this.roleService.getRoles().subscribe(function (roles) {
            _this.roles = roles;
        });
    }
    RegisterPageComponent.prototype.register = function () {
        var _this = this;
        this.loading = true;
        this.authenticationService.register(this.model)
            .subscribe(function (data) {
            _this.router.navigate(['/dashboard']);
        }, function (error) {
            _this.loading = false;
        });
    };
    RegisterPageComponent.prototype.ngOnInit = function () {
    };
    RegisterPageComponent = __decorate([
        core_1.Component({
            selector: 'app-register-page',
            templateUrl: './register-page.component.html',
            styleUrls: ['./register-page.component.css']
        }),
        __metadata("design:paramtypes", [http_1.Http,
            router_1.ActivatedRoute,
            router_1.Router,
            authentication_service_1.AuthenticationService,
            role_service_1.RoleService])
    ], RegisterPageComponent);
    return RegisterPageComponent;
}());
exports.RegisterPageComponent = RegisterPageComponent;
//# sourceMappingURL=register-page.component.js.map