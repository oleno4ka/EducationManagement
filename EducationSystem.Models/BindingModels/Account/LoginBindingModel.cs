using System.ComponentModel.DataAnnotations;
using EducationSystem.Models.Constants;

namespace EducationSystem.Models.BindingModels
{
    public class LoginBindingModel
    {
        [Required(ErrorMessage = "login_error.email_required")]
        [DataType(DataType.EmailAddress, ErrorMessage = "login_error.email_invalid")]
        [EmailAddress(ErrorMessage = "login_error.email_invalid")]
        public string Email { get; set; }

        [Required(ErrorMessage = "login_error.pass_required")]
        [RegularExpression(ValidationConstants.PasswordValidationString, ErrorMessage = "login_error.pass_invalid")] 
        [DataType(DataType.Password)]
        public string Password { get; set; }

        [Required(ErrorMessage = "login_error.pass_required")]
        [DataType(DataType.Password)]
        [RegularExpression(ValidationConstants.PasswordValidationString, ErrorMessage = "login_error.pass_invalid")]
        public string ConfirmPassword { get; set; }
    }
}
