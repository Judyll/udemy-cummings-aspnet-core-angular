using Microsoft.AspNetCore.Identity;

namespace DatingApp.API.Models
{
    // By using IdentityUserRole<int>, we are now specifying that the Identity user role
    // Id will be of type int and not string
    public class UserRole : IdentityUserRole<int>
    {
        #region Navigation properties

        public User User { get; set; }
        public Role Role { get; set; }

        #endregion
    }
}
