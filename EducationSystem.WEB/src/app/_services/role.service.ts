import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Role } from 'app/_models/Role';

const Headers = new HttpHeaders({ 'Content-Type': 'application/json', 'withCredentials': 'true' });
@Injectable()
export class RoleService {
    readonly BASEURL: string;

    constructor(private http: HttpClient) {
        this.BASEURL = environment.baseApi;
    }

    public getRoles(): Observable<Role[]>  {
        return this.http.get<Role[]>(this.BASEURL + 'api/account/roles', { headers: Headers });
    }

}
