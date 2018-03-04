using System;
using System.Collections.Generic;

namespace EducationManagement.Database.Models
{
    public partial class Task
    {
        public Task()
        {
            StudentTask = new HashSet<StudentTask>();
            SubjectLevel = new HashSet<SubjectLevel>();
            TaskFile = new HashSet<TaskFile>();
        }

        public int UnitId { get; set; }
        public string Name { get; set; }
        public DateTime? Deadline { get; set; }
        public int Id { get; set; }
        public int ScoreMax { get; set; }
        public string Duration { get; set; }
        public string Description { get; set; }
        public Guid CreatorId { get; set; }
        public bool CanReattend { get; set; }
        public int TaskTypeId { get; set; }

        public Teacher Creator { get; set; }
        public TaskType TaskType { get; set; }
        public Unit Unit { get; set; }
        public ICollection<StudentTask> StudentTask { get; set; }
        public ICollection<SubjectLevel> SubjectLevel { get; set; }
        public ICollection<TaskFile> TaskFile { get; set; }
    }
}
