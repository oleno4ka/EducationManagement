using System;
using System.Collections.Generic;

namespace EducationManagement.Database.Models
{
    public partial class FileType
    {
        public FileType()
        {
            File = new HashSet<File>();
        }

        public int Id { get; set; }
        public string Name { get; set; }

        public ICollection<File> File { get; set; }
    }
}
