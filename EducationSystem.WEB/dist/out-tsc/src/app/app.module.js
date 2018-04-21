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
require("rxjs/add/operator/map");
var app_routing_1 = require("./app.routing");
var components_module_1 = require("./components/components.module");
var http_loader_1 = require("@ngx-translate/http-loader");
var http_2 = require("@angular/common/http");
var angular2_toaster_1 = require("angular2-toaster");
var animations_1 = require("@angular/platform-browser/animations");
var core_2 = require("@ngx-translate/core");
var token_interceptor_1 = require("./_interceptors/token.interceptor");
var ng_select_1 = require("ng-select");
var dialog_1 = require("@angular/material/dialog");
var material_1 = require("@angular/material");
//components
var app_component_1 = require("./app.component");
var dashboard_component_1 = require("./components/admin/dashboard/dashboard.component");
var user_profile_component_1 = require("./components/profile/user-profile/user-profile.component");
var login_page_component_1 = require("./components/authorization/login-page/login-page.component");
var register_page_component_1 = require("./components/authorization/register-page/register-page.component");
var users_list_component_1 = require("./components/admin/users-list/users-list.component");
var info_dialog_component_1 = require("./components/dialogs/info-dialog/info-dialog.component");
var edit_dialog_component_1 = require("./components/dialogs/edit-dialog/edit-dialog.component");
var edit_user_form_component_1 = require("./components/dialogs/edit-user-form/edit-user-form.component");
var home_component_1 = require("./components/home/home.component");
var teacher_dashboard_component_1 = require("./components/teacher/teacher-dashboard/teacher-dashboard.component");
var permission_error_component_1 = require("./components/error/permission-error/permission-error.component");
var subject_level_config_component_1 = require("./components/admin/subject-level-config/subject-level-config.component");
//services
var authentication_service_1 = require("./_services/authentication.service");
var role_service_1 = require("./_services/role.service");
var base_toaster_service_1 = require("./_services/base-toaster.service");
var array_values_pipe_1 = require("./_pipes/array-values.pipe");
var auth_guard_1 = require("./_guards/auth.guard");
var user_service_1 = require("./_services/user.service");
var role_guard_1 = require("app/_guards/role.guard");
var subjectlevel_service_1 = require("./_services/subjectlevel.service");
var add_subject_dialog_component_1 = require("app/components/dialogs/add-subject-dialog/add-subject-dialog.component");
// AoT requires an exported function for factories
function HttpLoaderFactory(http) {
    return new http_loader_1.TranslateHttpLoader(http);
}
exports.HttpLoaderFactory = HttpLoaderFactory;
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                dashboard_component_1.DashboardComponent,
                teacher_dashboard_component_1.TeacherDashboardComponent,
                permission_error_component_1.PermissionErrorComponent,
                edit_user_form_component_1.EditUserFormComponent,
                user_profile_component_1.UserProfileComponent,
                login_page_component_1.LoginPageComponent,
                register_page_component_1.RegisterPageComponent,
                array_values_pipe_1.ArrayValuesPipe,
                users_list_component_1.UsersListComponent,
                info_dialog_component_1.InfoDialog,
                edit_dialog_component_1.EditDialog,
                add_subject_dialog_component_1.AddSubjectDialog,
                home_component_1.HomeComponent,
                subject_level_config_component_1.SubjectLevelConfigComponent,
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
                animations_1.BrowserAnimationsModule,
                angular2_toaster_1.ToasterModule,
                ng_select_1.SelectModule,
                dialog_1.MatDialogModule,
                material_1.MatButtonModule,
                material_1.MatCheckboxModule
            ],
            entryComponents: [
                info_dialog_component_1.InfoDialog,
                edit_dialog_component_1.EditDialog,
                add_subject_dialog_component_1.AddSubjectDialog
            ],
            exports: [core_2.TranslateModule],
            providers: [
                authentication_service_1.AuthenticationService,
                role_service_1.RoleService,
                base_toaster_service_1.BaseTosterService,
                angular2_toaster_1.ToasterService,
                {
                    provide: http_2.HTTP_INTERCEPTORS,
                    useClass: token_interceptor_1.TokenInterceptor,
                    multi: true
                },
                { provide: dialog_1.MatDialogConfig, useValue: { hasBackdrop: false } },
                auth_guard_1.AuthGuard,
                role_guard_1.RoleGuard,
                user_service_1.UserService,
                subjectlevel_service_1.SubjectLevelService
            ],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map