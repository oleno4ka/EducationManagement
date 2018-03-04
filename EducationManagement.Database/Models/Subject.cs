using System;
using System.Collections.Generic;

namespace EducationManagement.Database.Models
{
    public partial class Subject
    {
        public Subject()
        {
            SubjectLevel = new HashSet<SubjectLevel>();
            TeacherSubject = new HashSet<TeacherSubject>();
        }

        public int Id { get; set; }
        public string Name { get; set; }

        public ICollection<SubjectLevel> SubjectLevel { get; set; }
        public ICollection<TeacherSubject> TeacherSubject { get; set; }
    }
}
