import { Component, OnInit } from '@angular/core';
import { UserService } from 'app/_services/user.service';
import { Observable } from 'rxjs/Observable';
import { User } from 'app/_models/User';
import { AuthGuard } from 'app/_guards/auth.guard';
import { Roles } from 'app/_enums/roles';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ADMIN_ROUTES: RouteInfo[] = [
    { path: 'dashboard', title: 'Dashboard', icon: 'dashboard', class: '' }
];

export const TEACHER_ROUTES: RouteInfo[] = [
    { path: 'teacher-dashboard', title: 'Dashboard', icon: 'dashboard', class: '' }
];

export const STUDENT_ROUTES: RouteInfo[] = [
];

export const ROUTES: RouteInfo[] = [
    { path: 'user-profile', title: 'User Profile', icon: 'person', class: '' },
    { path: 'table-list', title: 'Table List', icon: 'content_paste', class: '' },
    { path: 'typography', title: 'Typography', icon: 'library_books', class: '' },
    { path: 'icons', title: 'Icons', icon: 'bubble_chart', class: '' },
    { path: 'maps', title: 'Maps', icon: 'location_on', class: '' },
    { path: 'notifications', title: 'Notifications', icon: 'notifications', class: '' },
    { path: 'upgrade', title: 'Upgrade to PRO', icon: 'unarchive', class: 'active-pro' },
];

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
    menuItems: any[];
    // public user: User = new User();
    public currentUserName: string;
    userService: UserService;
    private authGuard: AuthGuard;

    constructor(private _userService: UserService, private _authGuard: AuthGuard) {
        this.userService = _userService;
        this.authGuard = _authGuard;
    }

    ngOnInit() {
        if (this._authGuard.isAuthenticated) {
            if (this._authGuard.userRoleId && Roles[this._authGuard.userRoleId] == Roles.Admin) {
                this.menuItems = ADMIN_ROUTES.filter(menuItem => menuItem);
            }
            if (this._authGuard.userRoleId && Roles[this._authGuard.userRoleId] == Roles.Student) {
                this.menuItems = STUDENT_ROUTES.filter(menuItem => menuItem);
            }
            if (this._authGuard.userRoleId && Roles[this._authGuard.userRoleId] == Roles.Teacher) {
                this.menuItems = TEACHER_ROUTES.filter(menuItem => menuItem);
            }
        }
        this.menuItems = ROUTES.filter(menuItem => menuItem);

        if (this.authGuard.isAuthenticated ) {
            var userObs = this.userService.getCurrent().subscribe(user => {
                this.currentUserName = user.FullNameString;
            },
                error => { console.log("error: sidebar component"); });
        }
        else {
            this.currentUserName = "Education system";
        }
    }
    isMobileMenu() {
        if (window.screen.width > 991) {
            return false;
        }
        return true;
    };

    isAdmin(): boolean {
        console.log(this._authGuard.userRoleId);
        return this._authGuard.userRoleId && Roles[this._authGuard.userRoleId] == Roles.Admin;
    }
}
