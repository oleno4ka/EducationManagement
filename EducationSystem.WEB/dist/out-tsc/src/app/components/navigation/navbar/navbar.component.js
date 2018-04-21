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
var sidebar_component_1 = require("../sidebar/sidebar.component");
var common_1 = require("@angular/common");
var auth_guard_1 = require("app/_guards/auth.guard");
var authentication_service_1 = require("app/_services/authentication.service");
var NavbarComponent = /** @class */ (function () {
    function NavbarComponent(location, element, authGuard, authenticationService) {
        this.element = element;
        this.authGuard = authGuard;
        this.authenticationService = authenticationService;
        this.location = location;
        this.sidebarVisible = false;
    }
    NavbarComponent.prototype.ngOnInit = function () {
        this.listTitles = sidebar_component_1.ROUTES.filter(function (listTitle) { return listTitle; });
        var navbar = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];
        if (this.authGuard.isAuthenticated) {
            this.loginText = "Log off";
        }
        else {
            this.loginText = "Log in";
        }
    };
    NavbarComponent.prototype.userRoleIdChanged = function (roleId) {
        console.log(roleId + " role is in navbar.component");
        this.userRoleId = roleId;
        console.log(roleId);
    };
    NavbarComponent.prototype.sidebarOpen = function () {
        var toggleButton = this.toggleButton;
        var body = document.getElementsByTagName('body')[0];
        setTimeout(function () {
            toggleButton.classList.add('toggled');
        }, 500);
        body.classList.add('nav-open');
        this.sidebarVisible = true;
    };
    ;
    NavbarComponent.prototype.sidebarClose = function () {
        var body = document.getElementsByTagName('body')[0];
        this.toggleButton.classList.remove('toggled');
        this.sidebarVisible = false;
        body.classList.remove('nav-open');
    };
    ;
    NavbarComponent.prototype.sidebarToggle = function () {
        if (this.sidebarVisible === false) {
            this.sidebarOpen();
        }
        else {
            this.sidebarClose();
        }
    };
    ;
    NavbarComponent.prototype.getTitle = function () {
        var titlee = this.location.prepareExternalUrl(this.location.path());
        if (titlee.charAt(0) === '#') {
            titlee = titlee.slice(2);
        }
        titlee = titlee.split('/').pop();
        for (var item = 0; item < this.listTitles.length; item++) {
            if (this.listTitles[item].path === titlee) {
                return this.listTitles[item].title;
            }
        }
        return 'Dashboard';
    };
    ;
    NavbarComponent.prototype.logOut = function () {
        if (this.authGuard.isAuthenticated) {
            this.authenticationService.logout();
        }
        else {
            //this.loginText = "Log in";
        }
    };
    ;
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], NavbarComponent.prototype, "userRoleId", void 0);
    NavbarComponent = __decorate([
        core_1.Component({
            selector: 'app-navbar',
            templateUrl: './navbar.component.html',
            styleUrls: ['./navbar.component.css']
        }),
        __metadata("design:paramtypes", [common_1.Location,
            core_1.ElementRef,
            auth_guard_1.AuthGuard,
            authentication_service_1.AuthenticationService])
    ], NavbarComponent);
    return NavbarComponent;
}());
exports.NavbarComponent = NavbarComponent;
//# sourceMappingURL=navbar.component.js.map