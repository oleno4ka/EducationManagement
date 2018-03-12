using System;
using System.Collections.Generic;

namespace EducationManagement.Database.Models
{
    public partial class TeacherGroup
    {
        public int GroupId { get; set; }
        public string TeacherId { get; set; }

        public Group Group { get; set; }
        public Teacher Teacher { get; set; }
    }
}
