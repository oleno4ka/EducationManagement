using System.Collections.Generic;

namespace EducationManagement.Database.Models
{
    public partial class Student : User
    {
        public Student()
        {
            StudentGroup = new HashSet<StudentGroup>();
            StudentTask = new HashSet<StudentTask>();
        }

        public int GroupId { get; set; }

        public ICollection<StudentGroup> StudentGroup { get; set; }
        public ICollection<StudentTask> StudentTask { get; set; }
    }
}
