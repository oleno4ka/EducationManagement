"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var angular2_toaster_1 = require("angular2-toaster/angular2-toaster");
var router_1 = require("@angular/router");
var BaseTosterService = /** @class */ (function () {
    function BaseTosterService(router, toasterService) {
        this.router = router;
        this.toasterService = toasterService;
        this.baseToasterConfig = new angular2_toaster_1.ToasterConfig({
            positionClass: 'toast-top-right'
        });
    }
    BaseTosterService.prototype.error = function (title, body) {
        if (title === void 0) { title = "Error!"; }
        if (body === void 0) { body = "Incorrect data inserted!"; }
        var toast = {
            type: 'error',
            title: title,
            body: body
        };
        this.toasterService.pop(toast);
    };
    BaseTosterService.prototype.success = function (title, body) {
        if (title === void 0) { title = "Success!"; }
        if (body === void 0) { body = 'Applied succesfully!'; }
        var toast = {
            type: 'success',
            title: title,
            body: body
        };
        this.toasterService.popAsync(toast);
    };
    BaseTosterService.prototype.info = function (title, body) {
        if (title === void 0) { title = "Info!"; }
        if (body === void 0) { body = 'Info!'; }
        var toast = {
            type: 'info',
            title: title,
            body: body
        };
        this.toasterService.popAsync(toast);
    };
    BaseTosterService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [router_1.Router, angular2_toaster_1.ToasterService])
    ], BaseTosterService);
    return BaseTosterService;
}());
exports.BaseTosterService = BaseTosterService;
//# sourceMappingURL=base-toaster.service.js.map