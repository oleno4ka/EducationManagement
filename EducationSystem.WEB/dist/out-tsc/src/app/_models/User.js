"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var moment = require("moment");
var roles_1 = require("app/_enums/roles");
var User = /** @class */ (function () {
    function User(id, firstName, lastName, middleName, phoneNumber, email, dateOfBirth, dateRegistered, profilePictureUrl, roleId) {
        this.id = '';
        this.firstName = firstName;
        this.id = id;
        this.lastName = lastName;
        this.middleName = middleName;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.dateOfBirth = dateOfBirth;
        this.dateRegistered = dateRegistered;
        this.profilePictureUrl = profilePictureUrl;
        this.roleId = roleId;
    }
    Object.defineProperty(User.prototype, "DateOfBirthString", {
        get: function () {
            return moment(this.dateOfBirth).format('MMMM Do YYYY');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(User.prototype, "Role", {
        get: function () {
            return roles_1.Roles[this.roleId];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(User.prototype, "DateRegisteredString", {
        get: function () {
            return moment(this.dateRegistered).format('MMMM Do YYYY');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(User.prototype, "FullNameString", {
        get: function () {
            var middle = (this.middleName != null && this.middleName != "") ? this.middleName + " " : "";
            return this.firstName + " " + middle + this.lastName;
        },
        enumerable: true,
        configurable: true
    });
    return User;
}());
exports.User = User;
//# sourceMappingURL=User.js.map