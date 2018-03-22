using System;
using System.ComponentModel.DataAnnotations;

namespace EducationSystem.Models.BindingModels
{
    public class UsersListBindingModel
    {
        public string Id { get; set; }

        [DataType(DataType.EmailAddress, ErrorMessage = "login_error.email_invalid")]
        [EmailAddress(ErrorMessage = "login_error.email_invalid")]
        public string Email { get; set; }

        public string FullName { get; set; }

        [DataType(DataType.PhoneNumber)]
        public string PhoneNumber { get; set; }

        public string DateOfBirth { get; set; }

        public string DateRegistered { get; set; }

        [DataType(DataType.ImageUrl, ErrorMessage = "datatype_error.imageurl_invalid")]
        public string ProfilePictureUrl { get; set; }

        public string Role { get; set; }
    }
}
