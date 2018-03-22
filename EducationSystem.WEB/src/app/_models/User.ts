import * as moment from 'moment';
import { Roles } from 'app/_enums/roles';

export class User {
    public id ='';
    public firstName: string;
    public lastName: string;
    public middleName: string;
    public phoneNumber: string;
    public email: string;
    public dateOfBirth: Date;
    public dateRegistered: Date;
    public profilePictureUrl: string;
    public roleId: string;

    constructor(id?: string, firstName?: string, lastName?: string, middleName?: string,
        phoneNumber?: string, email?: string, dateOfBirth?: Date, dateRegistered?: Date,
        profilePictureUrl?: string, roleId?: string) {

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

    public get DateOfBirthString(): string {
        return moment(this.dateOfBirth).format('MMMM Do YYYY');
    }

    public get Role(): string {
        return Roles[this.roleId];
    }

    public get DateRegisteredString(): string {
        return moment(this.dateRegistered).format('MMMM Do YYYY');
    }

    public get FullNameString(): string {
        var middle = (this.middleName != null && this.middleName != "") ? this.middleName + " " : "";
        return this.firstName + " " + middle + this.lastName;
    }
}