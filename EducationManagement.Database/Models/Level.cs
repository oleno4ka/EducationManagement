using System;
using System.Collections.Generic;

namespace EducationManagement.Database.Models
{
    public partial class Level
    {
        public Level()
        {
            SubjectLevel = new HashSet<SubjectLevel>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public int? MinEntryTaskScore { get; set; }

        public ICollection<SubjectLevel> SubjectLevel { get; set; }
    }
}
