using EducationSystem.Models.Constants;
using System;
using System.ComponentModel.DataAnnotations;

namespace EducationSystem.Models.BindingModels
{
    public class RegisterBindingModel
    {
        [Required(ErrorMessage = "register_error.firstname_required")]
        public string FirstName { get; set; }

        [Required(ErrorMessage = "register_error.lastname_required")]
        public string LastName { get; set; }

        public string MiddleName { get; set; }

        [DataType(DataType.PhoneNumber)]
        public string PhoneNumber { get; set; }

        [DataType(DataType.EmailAddress)]
        public string Email { get; set; }

        [DataType(DataType.Date)]
        public DateTime? DateOfBirth { get; set; }

        [Required(ErrorMessage = "register_error.password_required")]
        [DataType(DataType.Password)]
        [RegularExpression(ValidationConstants.PasswordValidationString, ErrorMessage = "register_error.password_invalid")]
        public string Password { get; set; }

        [Required(ErrorMessage = "register_error.password_required")]
        [DataType(DataType.Password)]
        [RegularExpression(ValidationConstants.PasswordValidationString, ErrorMessage = "register_error.password_invalid")]
        [Compare("Password")]
        public string ConfirmPassword { get; set; }

        public string RoleId { get; set; }
    }
}
