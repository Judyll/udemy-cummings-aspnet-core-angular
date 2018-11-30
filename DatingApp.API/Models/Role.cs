using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;

namespace DatingApp.API.Models
{
    // By using IdentityRole<int>, we are now specifying that the primary key for the role
    // is of type int and not a string.
    public class Role : IdentityRole<int>
    {
        #region Navigation properties

        public ICollection<UserRole> UserRoles { get; set; }

        #endregion
    }
}
