using System;
using System.Collections.Generic;

namespace EducationManagement.Database.Models
{
    public partial class SubjectLevel
    {
        public SubjectLevel()
        {
            Group = new HashSet<Group>();
            Unit = new HashSet<Unit>();
        }

        public int SubjectId { get; set; }
        public int LevelId { get; set; }
        public int? EntryTaskId { get; set; }
        public int Price { get; set; }

        public Task EntryTask { get; set; }
        public Level Level { get; set; }
        public Subject Subject { get; set; }
        public ICollection<Group> Group { get; set; }
        public ICollection<Unit> Unit { get; set; }
        public ICollection<SubjectLevelFile> SubjectLevelFiles { get; set; }
    }
}
