import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Role } from 'app/_models/Role';

const Headers = new HttpHeaders({ 'Content-Type': 'application/json', 'withCredentials': 'true' });
@Injectable()
export class PermissionService {
    readonly BASEURL: string;
    private permissions: any = {}

    //TODO: add permission access
    //constructor(private http: HttpClient) {
    //    this.BASEURL = environment.baseApi;
    //    let permissions = {
    //        "ADMIN_": "1000",
    //        "EDIT_DISBMT_WORKFLOW": "1001",
    //        "EDIT_UPLOAD_PHOTO_DISBMT_WORKFLOW": "1002",
    //        "EDIT_UPLOAD_CONFIRMED_DISBMT_WORKFLOW": "1003",
    //        "EDIT_VERIFIED_DISBMT_WORKFLOW": "1004",
    //        "VIEW_DISBMT_WORKFLOW": "1005",
    //        "DELETE_DISBMT_WORKFLOW": "1006"
    //    };
    //}

    //public getCurrentRolePermissions() {
    //    return this.http.get(this.BASEURL + 'api/account/getrolepermissions', { headers: Headers });
    //}

    //setPermissions(permissions: any): void {
    //    this.permissions = permissions;
    //}

    //public canCurrentUser(permission: string): boolean {
    //    return (permission in this.permissions);
    //}
}