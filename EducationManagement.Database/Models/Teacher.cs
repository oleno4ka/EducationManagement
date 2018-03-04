using System;
using System.Collections.Generic;

namespace EducationManagement.Database.Models
{
    public partial class Teacher
    {
        public Teacher()
        {
            Task = new HashSet<Task>();
            TeacherGroup = new HashSet<TeacherGroup>();
            TeacherSubject = new HashSet<TeacherSubject>();
        }

        public Guid Id { get; set; }
        public string Qualifications { get; set; }

        public User IdNavigation { get; set; }
        public ICollection<Task> Task { get; set; }
        public ICollection<TeacherGroup> TeacherGroup { get; set; }
        public ICollection<TeacherSubject> TeacherSubject { get; set; }
    }
}
