export class Level {
    public Name: string;
    public Id: number;
    public MinEntryTaskScore: number;

    constructor(name?: string, id?: number, minEntryTaskScore?: number) {
        this.Name = name;
        this.Id = id;
        this.MinEntryTaskScore = minEntryTaskScore;
    }
}