using System;
using System.Collections.Generic;

namespace EducationManagement.Database.Models
{
    public partial class Unit
    {
        public Unit()
        {
            Task = new HashSet<Task>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int SubjectId { get; set; }
        public int LevelId { get; set; }
        public int ScoreMin { get; set; }

        public SubjectLevel SubjectLevel { get; set; }
        public ICollection<Task> Task { get; set; }
    }
}
