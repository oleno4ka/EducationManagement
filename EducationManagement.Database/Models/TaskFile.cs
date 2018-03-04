using System;
using System.Collections.Generic;

namespace EducationManagement.Database.Models
{
    public partial class TaskFile
    {
        public int TaskId { get; set; }
        public int FileId { get; set; }

        public File File { get; set; }
        public Task Task { get; set; }
    }
}
