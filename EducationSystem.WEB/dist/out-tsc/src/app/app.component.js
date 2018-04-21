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
var common_1 = require("@angular/common");
require("rxjs/add/operator/filter");
var navbar_component_1 = require("./components/navigation/navbar/navbar.component");
var router_1 = require("@angular/router");
var perfect_scrollbar_1 = require("perfect-scrollbar");
var core_2 = require("@ngx-translate/core");
var authentication_service_1 = require("./_services/authentication.service");
var angular2_toaster_1 = require("angular2-toaster");
var AppComponent = /** @class */ (function () {
    function AppComponent(location, router, translate, toasterService, authenticationService) {
        var _this = this;
        this.location = location;
        this.router = router;
        this.authenticationService = authenticationService;
        this.yScrollStack = [];
        this.config = new angular2_toaster_1.ToasterConfig({
            showCloseButton: true,
            tapToDismiss: false,
            timeout: 0
        });
        this.translate = translate;
        this.translate.setDefaultLang('en');
        this.translate.use('en');
        this.toasterService = toasterService;
        authenticationService.userLogged$.subscribe(function (roleId) {
            _this.userRoleId = roleId;
            console.log(roleId + " role is in app.component");
        });
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        $.material.init();
        var elemMainPanel = document.querySelector('.main-panel');
        var elemSidebar = document.querySelector('.sidebar .sidebar-wrapper');
        this.location.subscribe(function (ev) {
            _this.lastPoppedUrl = ev.url;
        });
        this.router.events.subscribe(function (event) {
            _this.navbar.sidebarClose();
            if (event instanceof router_1.NavigationStart) {
                if (event.url != _this.lastPoppedUrl)
                    _this.yScrollStack.push(window.scrollY);
            }
            else if (event instanceof router_1.NavigationEnd) {
                if (event.url == _this.lastPoppedUrl) {
                    _this.lastPoppedUrl = undefined;
                    window.scrollTo(0, _this.yScrollStack.pop());
                }
                else
                    window.scrollTo(0, 0);
            }
        });
        this._router = this.router.events.filter(function (event) { return event instanceof router_1.NavigationEnd; }).subscribe(function (event) {
            elemMainPanel.scrollTop = 0;
            elemSidebar.scrollTop = 0;
        });
        if (window.matchMedia("(min-width: 960px)").matches && !this.isMac()) {
            var ps = new perfect_scrollbar_1.default(elemMainPanel);
            ps = new perfect_scrollbar_1.default(elemSidebar);
        }
    };
    AppComponent.prototype.ngAfterViewInit = function () {
        this.runOnRouteChange();
    };
    AppComponent.prototype.runOnRouteChange = function () {
        if (window.matchMedia("(min-width: 960px)").matches && !this.isMac()) {
            var elemMainPanel = document.querySelector('.main-panel');
            var ps = new perfect_scrollbar_1.default(elemMainPanel);
            ps.update();
        }
    };
    AppComponent.prototype.isMac = function () {
        var bool = false;
        if (navigator.platform.toUpperCase().indexOf('MAC') >= 0 || navigator.platform.toUpperCase().indexOf('IPAD') >= 0) {
            bool = true;
        }
        return bool;
    };
    AppComponent.prototype.useLanguage = function (language) {
        this.translate.use(language);
    };
    __decorate([
        core_1.ViewChild(navbar_component_1.NavbarComponent),
        __metadata("design:type", navbar_component_1.NavbarComponent)
    ], AppComponent.prototype, "navbar", void 0);
    AppComponent = __decorate([
        core_1.Component({
            selector: 'app-root',
            templateUrl: './app.component.html',
            styleUrls: ['./app.component.css'],
            providers: [authentication_service_1.AuthenticationService]
        }),
        __metadata("design:paramtypes", [common_1.Location,
            router_1.Router,
            core_2.TranslateService,
            angular2_toaster_1.ToasterService,
            authentication_service_1.AuthenticationService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map