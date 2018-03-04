using System;
using System.Collections.Generic;

namespace EducationManagement.Database.Models
{
    public partial class TaskType
    {
        public TaskType()
        {
            Task = new HashSet<Task>();
        }

        public int Id { get; set; }
        public string Name { get; set; }

        public ICollection<Task> Task { get; set; }
    }
}
