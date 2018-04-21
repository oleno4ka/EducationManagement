import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Subject } from 'rxjs/Subject';
import { AuthGuard } from 'app/_guards/auth.guard';

const Headers = new HttpHeaders({ 'Content-Type': 'application/json', 'withCredentials': 'true' });

@Injectable()
export class AuthenticationService {

    private userLoggedSource = new Subject<string>();
    userLogged$ = this.userLoggedSource.asObservable();

    readonly BASEURL: string;
    constructor(private http: HttpClient, private authGuard:AuthGuard) {
        this.BASEURL = environment.baseApi;
        this.authGuard = authGuard;
    }

    public register(model) {
        return this.http.post(this.BASEURL + 'api/account/register', model, { headers: Headers })
            .map((response: any) => {
                let user = response;
                if (user && user.token) {
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.userLoggedSource.next(this.authGuard.userRoleId);
                }

                return user;
            });
    }

    public login(model) {
        return this.http.post(this.BASEURL + 'api/account/login', model, { headers: Headers })

            .map((response: any) => {
                let user = response;
                if (user && user.token) {
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.userLoggedSource.next(this.authGuard.userRoleId);
                }

                return user;
            });
    }

    logout() {
        localStorage.removeItem('currentUser');
    }
}
