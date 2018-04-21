"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var platform_browser_1 = require("@angular/platform-browser");
var router_1 = require("@angular/router");
var dashboard_component_1 = require("./components/admin/dashboard/dashboard.component");
var user_profile_component_1 = require("./components/profile/user-profile/user-profile.component");
var auth_guard_1 = require("./_guards/auth.guard");
var register_page_component_1 = require("./components/authorization/register-page/register-page.component");
var login_page_component_1 = require("./components/authorization/login-page/login-page.component");
var role_guard_1 = require("app/_guards/role.guard");
var roles_1 = require("app/_enums/roles");
var users_list_component_1 = require("./components/admin/users-list/users-list.component");
var home_component_1 = require("./components/home/home.component");
var teacher_dashboard_component_1 = require("./components/teacher/teacher-dashboard/teacher-dashboard.component");
var permission_error_component_1 = require("./components/error/permission-error/permission-error.component");
var subject_level_config_component_1 = require("./components/admin/subject-level-config/subject-level-config.component");
var routes = [
    {
        path: 'dashboard',
        component: dashboard_component_1.DashboardComponent,
        canActivate: [role_guard_1.RoleGuard],
        data: {
            expectedRole: roles_1.Roles.Admin.toString()
        }
    },
    {
        path: 'subject-level-config',
        component: subject_level_config_component_1.SubjectLevelConfigComponent,
        canActivate: [role_guard_1.RoleGuard],
        data: {
            expectedRole: roles_1.Roles.Admin.toString()
        }
    },
    {
        path: 'teacher-dashboard',
        component: teacher_dashboard_component_1.TeacherDashboardComponent,
        canActivate: [role_guard_1.RoleGuard],
        data: {
            expectedRole: roles_1.Roles.Teacher.toString()
        }
    },
    { path: 'user-profile', component: user_profile_component_1.UserProfileComponent, canActivate: [auth_guard_1.AuthGuard] },
    {
        path: 'users',
        component: users_list_component_1.UsersListComponent,
        canActivate: [role_guard_1.RoleGuard],
        data: {
            expectedRole: roles_1.Roles.Admin.toString()
        }
    },
    { path: 'home', component: home_component_1.HomeComponent },
    { path: 'register', component: register_page_component_1.RegisterPageComponent },
    { path: 'permission-error', component: permission_error_component_1.PermissionErrorComponent },
    { path: 'login', component: login_page_component_1.LoginPageComponent },
    { path: '', redirectTo: 'home', pathMatch: 'full' }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                platform_browser_1.BrowserModule,
                router_1.RouterModule.forRoot(routes)
            ],
            exports: [],
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
//# sourceMappingURL=app.routing.js.map