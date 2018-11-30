using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;

namespace DatingApp.API.Models
{
    // The default implementation of Microsoft.AspNetCore.Identity.IdentityUser`1 which
    // uses a string as a primary key.  By using IdentityUser<int>, we are now specifying
    // that our primary key is of type int
    public class User : IdentityUser<int>
    {
        public string Gender { get; set; }

        public DateTime DateOfBirth { get; set; }

        public string KnownAs { get; set; }

        public DateTime Created { get; set; }

        public DateTime LastActive { get; set; }

        public string Introduction { get; set; }

        public string LookingFor { get; set; }

        public string Interest { get; set; }

        public string City { get; set; }

        public string Country { get; set; }

        #region Navigation properties

        public ICollection<Photo> Photos { get; set; }

        public ICollection<Like> Likers { get; set; }

        public ICollection<Like> Likees { get; set; }
        
        public ICollection<Message> MessagesSent { get; set; }

        public ICollection<Message> MessagesReceived { get; set; }

        public ICollection<UserRole> UserRoles { get; set; }

        #endregion
    }
}
