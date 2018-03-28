import { SubjectLevel } from "app/_models/SubjectLevel";

export class Subject {
    public Name: string;
    public Id: number;

    public SubjectLevels: SubjectLevel[];

    constructor(name?: string, id?: number) {
        this.Name = name;
        this.Id = id;
    }
}