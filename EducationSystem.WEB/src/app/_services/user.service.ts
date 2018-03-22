import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { User } from 'app/_models/User';

const Headers = new HttpHeaders({ 'Content-Type': 'application/json', 'withCredentials': 'true' });

@Injectable()
export class UserService {

    readonly BASEURL: string;
    public user: User = new User();

    constructor(private http: HttpClient) {
        this.BASEURL = environment.baseApi;
    }

    public getById(id: string): Observable<User> {
        return this.http.get<User>(this.BASEURL + 'api/users/getUser/' + id, { headers: Headers }).map(user => {
            return new User(user.id, user.firstName, user.lastName, user.middleName, user.phoneNumber, user.email, user.dateOfBirth, user.dateRegistered, user.profilePictureUrl, user.roleId);
        });
    }

    public getCurrent(): Observable<User> {
        return this.http.get<User>(this.BASEURL + 'api/users/getUser/current', { headers: Headers })
            .map(user => {
                return new User(user.id, user.firstName, user.lastName, user.middleName, user.phoneNumber, user.email, user.dateOfBirth, user.dateRegistered, user.profilePictureUrl, user.roleId);
            });
    }

    public getList(): Observable<User[]> {
        return this.http.get<User[]>(this.BASEURL + 'api/users/getUsers/', { headers: Headers })
            .map(res => {
                return res.map(user => {
                    return new User(user.id, user.firstName, user.lastName, user.middleName, user.phoneNumber, user.email, user.dateOfBirth, user.dateRegistered, user.profilePictureUrl, user.roleId);
                });
            });
    }

    public edit(model) {
        return this.http.post(this.BASEURL + 'api/users/edit', model, { headers: Headers })
            .map((response: any) => {
                let user = response;
                return user;
            });
    }

    public remove(id) {
        return this.http.post(this.BASEURL + 'api/users/remove?id='+ id, { headers: Headers })
            .map((response: any) => {
                return response;
            });
    }
}