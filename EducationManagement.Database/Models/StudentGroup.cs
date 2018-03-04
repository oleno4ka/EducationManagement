using System;
using System.Collections.Generic;

namespace EducationManagement.Database.Models
{
    public partial class StudentGroup
    {
        public Guid StudentId { get; set; }
        public int GroupId { get; set; }

        public Group Group { get; set; }
        public Student Student { get; set; }
    }
}
