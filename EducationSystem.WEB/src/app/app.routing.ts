import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { TableListComponent } from './table-list/table-list.component';
import { TypographyComponent } from './typography/typography.component';
import { IconsComponent } from './icons/icons.component';
import { MapsComponent } from './maps/maps.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { UpgradeComponent } from './upgrade/upgrade.component';
import { AuthGuard } from "./_guards/auth.guard";
import { RegisterPageComponent } from './register-page/register-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RoleGuard } from 'app/_guards/role.guard';
import { Roles } from 'app/_enums/roles';
import { UsersListComponent } from 'app/users-list/users-list.component';

const routes: Routes =[
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [RoleGuard],
        data: {
            expectedRole: Roles.Admin.toString()
        }
    },
    { path: 'user-profile', component: UserProfileComponent, canActivate: [AuthGuard] },
    {
        path: 'users',
        component: UsersListComponent,
        canActivate: [RoleGuard],
        data: {
            expectedRole: Roles.Admin.toString()
        }
    },
    { path: 'table-list',     component: TableListComponent },
    { path: 'typography',     component: TypographyComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'notifications',  component: NotificationsComponent },
    { path: 'upgrade', component: UpgradeComponent },
    { path: 'register', component: RegisterPageComponent },
    { path: 'login', component: LoginPageComponent },
    { path: '',               redirectTo: 'dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
