using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace EducationManagement.Database.Models
{
    public partial class User : IdentityUser
    {
        public override string Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string MiddleName { get; set; }
        public override string PhoneNumber { get; set; }
        public override string Email { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public DateTime DateRegistered { get; set; }
        public string ProfilePictureUrl { get; set; }
        public string RoleId { get; set; }

        public Role Role { get; set; }
    }
}
