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
var auth_guard_1 = require("app/_guards/auth.guard");
var roles_1 = require("app/_enums/roles");
var authentication_service_1 = require("app/_services/authentication.service");
exports.ADMIN_ROUTES = [
    { path: 'dashboard', title: 'Dashboard', icon: 'dashboard', class: '' },
    { path: 'subject-level-config', title: 'Subjects Config', icon: 'build', class: '' }
];
exports.TEACHER_ROUTES = [
    { path: 'teacher-dashboard', title: 'Dashboard', icon: 'dashboard', class: '' }
];
exports.STUDENT_ROUTES = [];
exports.ROUTES = [
    { path: 'user-profile', title: 'User Profile', icon: 'person', class: '' },
    { path: 'home', title: 'Home', icon: 'home', class: '' }
];
var SidebarComponent = /** @class */ (function () {
    function SidebarComponent(_userService, authGuard, authenticationService) {
        var _this = this;
        this._userService = _userService;
        this.authGuard = authGuard;
        this.authenticationService = authenticationService;
        this.userService = _userService;
        this.authGuard = authGuard;
        this.subscription = authenticationService.userLogged$.subscribe(function (role) {
            console.log(role + " role is in sidebar.component");
            _this.userRole = role;
            _this.getMenuItems();
            _this.getUserName();
        });
        if (this.authGuard.isAuthenticated) {
            this.userRole = this.authGuard.userRoleId;
        }
    }
    SidebarComponent.prototype.ngOnInit = function () {
        this.getMenuItems();
        this.getUserName();
    };
    SidebarComponent.prototype.getMenuItems = function () {
        if (this.menuItems) {
            this.menuItems = null;
        }
        if (this.authGuard.isAuthenticated) {
            if (this.userRole && roles_1.Roles[this.userRole] == roles_1.Roles.Admin) {
                this.menuItems = exports.ADMIN_ROUTES.filter(function (menuItem) { return menuItem; });
            }
            if (this.userRole && roles_1.Roles[this.userRole] == roles_1.Roles.Student) {
                this.menuItems = exports.STUDENT_ROUTES.filter(function (menuItem) { return menuItem; });
            }
            if (this.userRole && roles_1.Roles[this.userRole] == roles_1.Roles.Teacher) {
                this.menuItems = exports.TEACHER_ROUTES.filter(function (menuItem) { return menuItem; });
            }
        }
        this.menuItems = this.menuItems ? this.menuItems.concat(exports.ROUTES.filter(function (menuItem) { return menuItem; })) : exports.ROUTES.filter(function (menuItem) { return menuItem; });
    };
    SidebarComponent.prototype.getUserName = function () {
        var _this = this;
        if (this.authGuard.isAuthenticated) {
            var userObs = this.userService.getCurrent().subscribe(function (user) {
                _this.currentUserName = user.FullNameString;
            }, function (error) { console.log("error: sidebar component"); });
        }
        else {
            this.currentUserName = "Education system";
        }
    };
    SidebarComponent.prototype.userRoleIdChanged = function (role) {
        this.userRole = role;
        console.log(role);
    };
    SidebarComponent.prototype.isMobileMenu = function () {
        if (window.screen.width > 991) {
            return false;
        }
        return true;
    };
    ;
    SidebarComponent.prototype.isAdmin = function () {
        console.log(this.authGuard.userRoleId);
        return this.authGuard.userRoleId && roles_1.Roles[this.authGuard.userRoleId] == roles_1.Roles.Admin;
    };
    SidebarComponent.prototype.ngOnDestroy = function () {
        // prevent memory leak when component destroyed
        this.subscription.unsubscribe();
    };
    SidebarComponent = __decorate([
        core_1.Component({
            selector: 'app-sidebar',
            templateUrl: './sidebar.component.html',
            styleUrls: ['./sidebar.component.css']
        }),
        __metadata("design:paramtypes", [user_service_1.UserService,
            auth_guard_1.AuthGuard,
            authentication_service_1.AuthenticationService])
    ], SidebarComponent);
    return SidebarComponent;
}());
exports.SidebarComponent = SidebarComponent;
//# sourceMappingURL=sidebar.component.js.map