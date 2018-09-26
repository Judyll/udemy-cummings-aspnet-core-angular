using System.ComponentModel.DataAnnotations;

namespace DatingApp.API.Dtos
{
    // DTO - Data Transfer Object
    // This is the class that we will add the validation since User class
    // is not suitable since we don't need to validate the Id, PasswordHash, PasswordSalt
    public class UserForRegisterDto
    {
        [Required]
        public string Username { get; set; }

        [Required]
        [StringLength(8, MinimumLength = 4, ErrorMessage = "You must specify password between 4 and 8 characters")]
        public string Password { get; set; }
    }
}
