using System;
using System.ComponentModel.DataAnnotations;

namespace DatingApp.API.Dtos
{
    // DTO - Data Transfer Object
    // This is the class that we will add the validation since User class
    // is not suitable since we don't need to validate the Id, PasswordHash, PasswordSalt
    public class UserForRegisterDto
    {
        // Since we are not capturing the Created and LastActive in
        // our Html, then we will add a constructor where these dates are set
        public UserForRegisterDto()
        {
            Created = DateTime.UtcNow;
            LastActive = DateTime.UtcNow;
        }

        [Required]
        public string Username { get; set; }

        [Required]
        [StringLength(8, MinimumLength = 4, ErrorMessage = "You must specify password between 4 and 8 characters")]
        public string Password { get; set; }

        [Required]
        public string Gender { get; set; }

        [Required]
        public string KnownAs { get; set; }

        [Required]
        public DateTime DateOfBirth { get; set; }

        [Required]
        public string City { get; set; }

        [Required]
        public string Country { get; set; }

        public DateTime Created { get; set; }

        public DateTime LastActive { get; set; }
    }
}
