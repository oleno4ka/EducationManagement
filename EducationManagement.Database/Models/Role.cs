using Microsoft.AspNetCore.Identity;

namespace EducationManagement.Database.Models
{
    public class Role : IdentityRole
    {
        public override string Id { get; set; }
        public override string Name { get; set; }
        public bool IsManageable { get; set; }
    }
}
