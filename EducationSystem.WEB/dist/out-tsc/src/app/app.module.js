"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
//modules
var platform_browser_1 = require("@angular/platform-browser");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var router_1 = require("@angular/router");
var app_routing_1 = require("./app.routing");
var components_module_1 = require("./components/components.module");
var http_loader_1 = require("@ngx-translate/http-loader");
var http_2 = require("@angular/common/http");
var angular2_toaster_1 = require("angular2-toaster");
var core_2 = require("@ngx-translate/core");
var token_interceptor_1 = require("./_interceptors/token.interceptor");
//components
var app_component_1 = require("./app.component");
var dashboard_component_1 = require("./dashboard/dashboard.component");
var user_profile_component_1 = require("./user-profile/user-profile.component");
var table_list_component_1 = require("./table-list/table-list.component");
var typography_component_1 = require("./typography/typography.component");
var icons_component_1 = require("./icons/icons.component");
var maps_component_1 = require("./maps/maps.component");
var notifications_component_1 = require("./notifications/notifications.component");
var upgrade_component_1 = require("./upgrade/upgrade.component");
var login_page_component_1 = require("./login-page/login-page.component");
var register_page_component_1 = require("./register-page/register-page.component");
//services
var authentication_service_1 = require("./_services/authentication.service");
var base_toaster_service_1 = require("./_services/base-toaster.service");
var array_values_pipe_1 = require("./_pipes/array-values.pipe");
var auth_guard_1 = require("./_guards/auth.guard");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                dashboard_component_1.DashboardComponent,
                user_profile_component_1.UserProfileComponent,
                table_list_component_1.TableListComponent,
                typography_component_1.TypographyComponent,
                icons_component_1.IconsComponent,
                maps_component_1.MapsComponent,
                notifications_component_1.NotificationsComponent,
                upgrade_component_1.UpgradeComponent,
                login_page_component_1.LoginPageComponent,
                register_page_component_1.RegisterPageComponent,
                array_values_pipe_1.ArrayValuesPipe,
            ],
            imports: [
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                http_2.HttpClientModule,
                http_1.HttpModule,
                components_module_1.ComponentsModule,
                router_1.RouterModule,
                core_2.TranslateModule.forRoot({
                    loader: {
                        provide: core_2.TranslateLoader,
                        useFactory: HttpLoaderFactory,
                        deps: [http_2.HttpClient]
                    }
                }),
                app_routing_1.AppRoutingModule,
                angular2_toaster_1.ToasterModule,
            ],
            providers: [
                authentication_service_1.AuthenticationService,
                base_toaster_service_1.BaseTosterService,
                angular2_toaster_1.ToasterService,
                {
                    provide: http_2.HTTP_INTERCEPTORS,
                    useClass: token_interceptor_1.TokenInterceptor,
                    multi: true
                },
                auth_guard_1.AuthGuard
            ],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
// AoT requires an exported function for factories
function HttpLoaderFactory(http) {
    return new http_loader_1.TranslateHttpLoader(http);
}
exports.HttpLoaderFactory = HttpLoaderFactory;
//# sourceMappingURL=app.module.js.map