"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var Headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json', 'withCredentials': 'true' });
var PermissionService = /** @class */ (function () {
    function PermissionService() {
        this.permissions = {};
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
    PermissionService = __decorate([
        core_1.Injectable()
    ], PermissionService);
    return PermissionService;
}());
exports.PermissionService = PermissionService;
//# sourceMappingURL=permission.service.js.map