using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;

namespace EducationManagement.Database.Models
{
    public class Role : IdentityRole
    {
        public Role()
        {
            Permissions = new HashSet<Permission>();
        }

        public bool IsManageable { get; set; }
        public ICollection<Permission> Permissions { get; set; }
}
}
