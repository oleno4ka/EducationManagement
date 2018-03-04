using System;
using System.Collections.Generic;

namespace EducationManagement.Database.Models
{
    public partial class Group
    {
        public Group()
        {
            StudentGroup = new HashSet<StudentGroup>();
            TeacherGroup = new HashSet<TeacherGroup>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public int StudentMax { get; set; }
        public int StudentMin { get; set; }
        public DateTime StartDate { get; set; }
        public int SubjectId { get; set; }
        public int LevelId { get; set; }

        public SubjectLevel SubjectLevel { get; set; }
        public ICollection<StudentGroup> StudentGroup { get; set; }
        public ICollection<TeacherGroup> TeacherGroup { get; set; }
    }
}
