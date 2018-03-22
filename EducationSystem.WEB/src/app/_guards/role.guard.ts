import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { Headers, RequestOptions, RequestOptionsArgs } from '@angular/http';
import { Roles } from 'app/_enums/roles';
import decode from 'jwt-decode';
import { AuthGuard } from 'app/_guards/auth.guard';

@Injectable()
export class RoleGuard implements CanActivate {

    private authGuard: AuthGuard;

    constructor(private router: Router, private _authGuard: AuthGuard) {
        this.authGuard = _authGuard;
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        // this will be passed from the route config
        // on the data property
        const expectedRole = route.data.expectedRole;
        const token = this._authGuard.token;
        console.log(expectedRole);
        console.log(this._authGuard.isAuthenticated);
        
        // decode the token to get its payload
        const tokenPayload = decode(token);
        console.log(this._authGuard.userRoleId + " " + tokenPayload.role);
        if (!this._authGuard.isAuthenticated) {
            this.router.navigate(['login']);
            //not logged in so redirect to login page with the return url
            this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        }
        if (tokenPayload.sub[1] !== Roles[expectedRole]) {
            this.router.navigate(['permission-error']);
             //not logged in so redirect to login page with the return url
            this.router.navigate(['/permission-error'], { queryParams: { returnUrl: state.url } });
        }

        return this._authGuard.isAuthenticated;
    }
}
