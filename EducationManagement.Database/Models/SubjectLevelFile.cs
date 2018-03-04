using System;
using System.Collections.Generic;

namespace EducationManagement.Database.Models
{
    public partial class SubjectLevelFile
    {
        public int SubjectId { get; set; }
        public int LevelId { get; set; }
        public int FileId { get; set; }

        public SubjectLevel SubjectLevel { get; set; }
        public File File { get; set; }
    }
}
