using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace EducationManagement.Database.Models
{
    public partial class User //: IdentityUser
    {
        public Guid Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string MiddleName { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public DateTime DateRegistered { get; set; }
        public string ProfilePictureUrl { get; set; }

        public Student Student { get; set; }
        public Teacher Teacher { get; set; }
    }
}
