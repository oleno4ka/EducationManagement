using System;
using System.Collections.Generic;

namespace EducationManagement.Database.Models
{
    public partial class StudentTask
    {
        public int TaskId { get; set; }
        public Guid StudentId { get; set; }
        public int? Score { get; set; }

        public Student Student { get; set; }
        public Task Task { get; set; }
    }
}
