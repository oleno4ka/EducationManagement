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
require("rxjs/add/operator/map");
var environment_1 = require("../../environments/environment");
var http_1 = require("@angular/common/http");
var Subject_1 = require("app/_models/Subject");
var Level_1 = require("app/_models/Level");
var SubjectLevel_1 = require("app/_models/SubjectLevel");
var Headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json', 'withCredentials': 'true' });
var SubjectLevelService = /** @class */ (function () {
    function SubjectLevelService(http) {
        this.http = http;
        this.BASEURL = environment_1.environment.baseApi;
    }
    SubjectLevelService.prototype.getSubjects = function () {
        return this.http.get(this.BASEURL + 'api/subject/getSubjects/', { headers: Headers }).map(function (subjectList) {
            return subjectList.map(function (subject) {
                var subj = new Subject_1.Subject(subject.Name, subject.Id);
                var levls = subject.SubjectLevels.map(function (sl) {
                    return new SubjectLevel_1.SubjectLevel(sl.LevelName, sl.LevelId, sl.SubjectName, sl.SubjectId, sl.EntryTaskId, sl.Price, sl.MinEnrtyTaskScore);
                });
                subj.SubjectLevels = levls;
                return subj;
            });
        });
    };
    SubjectLevelService.prototype.getLevels = function () {
        return this.http.get(this.BASEURL + 'api/subject/getSubjects/', { headers: Headers }).map(function (levelList) {
            var levelL;
            var ll = levelList.map(function (l) {
                levelL.push(new Level_1.Level(l.Name, l.Id, l.MinEntryTaskScore));
            });
            return levelL;
        });
    };
    SubjectLevelService.prototype.addSubject = function (model) {
        return this.http.post(this.BASEURL + 'api/subject/addNewSubject', model, { headers: Headers })
            .map(function (response) {
            var subject = response;
            return subject;
        });
    };
    SubjectLevelService.prototype.addLevelForSubject = function (model) {
        return this.http.post(this.BASEURL + 'api/subject/addLevelForSubject', model, { headers: Headers })
            .map(function (response) {
            var subject = response;
            return subject;
        });
    };
    SubjectLevelService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], SubjectLevelService);
    return SubjectLevelService;
}());
exports.SubjectLevelService = SubjectLevelService;
//# sourceMappingURL=subjectlevel.service.js.map