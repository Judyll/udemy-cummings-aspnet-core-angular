using Microsoft.AspNetCore.Identity;

namespace DatingApp.API.Models
{
    public class UserRole : IdentityUserRole<int>
    {
        #region Navigation properties

        public User User { get; set; }
        public Role Role { get; set; }

        #endregion
    }
}
