using System;
using System.ComponentModel.DataAnnotations;

namespace EducationSystem.Models.BindingModels
{
    public class UserBindingModel
    {
        public string Id { get; set; }

        [DataType(DataType.EmailAddress, ErrorMessage = "login_error.email_invalid")]
        [EmailAddress(ErrorMessage = "login_error.email_invalid")]
        public string Email { get; set; }

        [Required(ErrorMessage = "register_error.firstname_required")]
        public string FirstName { get; set; }

        [Required(ErrorMessage = "register_error.lastname_required")]
        public string LastName { get; set; }

        public string MiddleName { get; set; }

        [DataType(DataType.PhoneNumber)]
        public string PhoneNumber { get; set; }

        [DataType(DataType.Date)]
        public DateTime? DateOfBirth { get; set; }

        [DataType(DataType.Date)]
        public DateTime? DateRegistered { get; set; }

        [DataType(DataType.ImageUrl, ErrorMessage = "datatype_error.imageurl_invalid")]
        public string ProfilePictureUrl { get; set; }

        public string RoleId { get; set; }
    }
}
