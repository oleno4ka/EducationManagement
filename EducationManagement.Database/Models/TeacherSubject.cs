using System;
using System.Collections.Generic;

namespace EducationManagement.Database.Models
{
    public partial class TeacherSubject
    {
        public int SubjectId { get; set; }
        public string TeacherId { get; set; }

        public Subject Subject { get; set; }
        public Teacher Teacher { get; set; }
    }
}
