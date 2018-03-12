using System.Collections.Generic;

namespace EducationManagement.Database.Models
{
    public partial class Teacher : User
    {
        public Teacher()
        {
            Task = new HashSet<Task>();
            TeacherGroup = new HashSet<TeacherGroup>();
            TeacherSubject = new HashSet<TeacherSubject>();
        }

        public string Qualifications { get; set; }

        public ICollection<Task> Task { get; set; }
        public ICollection<TeacherGroup> TeacherGroup { get; set; }
        public ICollection<TeacherSubject> TeacherSubject { get; set; }
    }
}
