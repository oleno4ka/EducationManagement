using System;
using System.Collections.Generic;
using System.Text;

namespace EducationSystem.Models.BindingModels
{
    public class RegisterBindingModel
    {
        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string MiddleName { get; set; }

        public string PhoneNumber { get; set; }

        public string Email { get; set; }

        public DateTime? DateOfBirth { get; set; }

        public string Password { get; set; }

        public string ConfirmPassword { get; set; }
    }
}
