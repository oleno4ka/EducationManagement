using System;
using System.Collections.Generic;

namespace EducationManagement.Database.Models
{
    public partial class Student
    {
        public Student()
        {
            StudentGroup = new HashSet<StudentGroup>();
            StudentTask = new HashSet<StudentTask>();
        }

        public Guid Id { get; set; }
        public int GroupId { get; set; }

        public User IdNavigation { get; set; }
        public ICollection<StudentGroup> StudentGroup { get; set; }
        public ICollection<StudentTask> StudentTask { get; set; }
    }
}
