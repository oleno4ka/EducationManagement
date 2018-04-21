"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SubjectLevel = /** @class */ (function () {
    function SubjectLevel(levelName, levelId, subjectName, subjectId, entryTaskId, price, minEntryScore) {
        this.LevelName = levelName;
        this.LevelId = levelId;
        this.EntryTaskId = entryTaskId;
        this.Price = price;
        this.SubjectName = subjectName;
        this.SubjectId = subjectId;
        this.MinEnrtyTaskScore = minEntryScore;
    }
    Object.defineProperty(SubjectLevel.prototype, "Name", {
        get: function () {
            return this.SubjectName + " " + this.LevelName;
        },
        enumerable: true,
        configurable: true
    });
    return SubjectLevel;
}());
exports.SubjectLevel = SubjectLevel;
//# sourceMappingURL=SubjectLevel.js.map