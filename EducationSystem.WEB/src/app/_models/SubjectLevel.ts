export class SubjectLevel {
    public SubjectId: number;
    public LevelId: number;
    public SubjectName: string;
    public LevelName: string;
    public EntryTaskId: number;
    public MinEnrtyTaskScore: number;
    public Price: number;

    constructor(levelName?: string, levelId?: number, subjectName?: string, subjectId?: number,
        entryTaskId?:number, price?: number, minEntryScore?: number) {
        this.LevelName = levelName;
        this.LevelId = levelId;
        this.EntryTaskId = entryTaskId;
        this.Price = price;
        this.SubjectName = subjectName;
        this.SubjectId = subjectId;
        this.MinEnrtyTaskScore = minEntryScore;
    }

    public get Name(): string {
        return this.SubjectName + " " + this.LevelName;
    }
}