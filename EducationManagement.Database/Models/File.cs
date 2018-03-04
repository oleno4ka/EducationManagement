using System;
using System.Collections.Generic;

namespace EducationManagement.Database.Models
{
    public partial class File
    {
        public File()
        {
            TaskFile = new HashSet<TaskFile>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string Url { get; set; }
        public DateTime CreationDate { get; set; }
        public int FileTypeId { get; set; }
        public SubjectLevelFile SubjectLevelFile { get; set; }

        public FileType FileType { get; set; }
        public ICollection<TaskFile> TaskFile { get; set; }

    }
}
