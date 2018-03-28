import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Subject } from 'app/_models/Subject';
import { Level } from 'app/_models/Level';
import { SubjectLevel } from 'app/_models/SubjectLevel';

const Headers = new HttpHeaders({ 'Content-Type': 'application/json', 'withCredentials': 'true' });

@Injectable()
export class SubjectLevelService {

    readonly BASEURL: string;

    constructor(private http: HttpClient) {
        this.BASEURL = environment.baseApi;
    }

    public getSubjects(): Observable<Subject[]> {
        return this.http.get<Subject[]>(this.BASEURL + 'api/subject/getSubjects/', { headers: Headers }).map(subjectList => {
            return subjectList.map(subject => {
                var subj = new Subject(subject.Name, subject.Id);
                var levls = subject.SubjectLevels.map(sl => {
                    return new SubjectLevel(sl.LevelName, sl.LevelId, sl.SubjectName, sl.SubjectId,
                        sl.EntryTaskId, sl.Price, sl.MinEnrtyTaskScore);
                });
                subj.SubjectLevels = levls;
                return subj;
            });
        });
    }

    public getLevels(): Observable<Level[]> {
        return this.http.get<Level[]>(this.BASEURL + 'api/subject/getSubjects/', { headers: Headers }).map(levelList => {
            var levelL : Level[];
            var ll = levelList.map(l => {
                levelL.push(new Level(l.Name, l.Id, l.MinEntryTaskScore));
            });

            return levelL;
        });
    }

    public addSubject(model: Subject): Observable<Subject>{
        return this.http.post(this.BASEURL + 'api/subject/addNewSubject', model, { headers: Headers })
            .map((response: any) => {
                let subject = response;
                return subject;
            });
    }

    public addLevelForSubject(model: SubjectLevel): Observable<SubjectLevel> {
        return this.http.post(this.BASEURL + 'api/subject/addLevelForSubject', model, { headers: Headers })
            .map((response: any) => {
                let subject = response;
                return subject;
            });
    }
}