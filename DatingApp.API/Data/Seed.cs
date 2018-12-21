using DatingApp.API.Models;
using Microsoft.AspNetCore.Identity;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Linq;

namespace DatingApp.API.Data
{
    public class Seed
    {
        private readonly UserManager<User> _userManager;
        private readonly RoleManager<Role> _roleManager;

        public Seed(UserManager<User> userManager, RoleManager<Role> roleManager)
        {
            _userManager = userManager;
            _roleManager = roleManager;
        }        

        public void SeedUsers()
        {
            if (!_userManager.Users.Any())
            {
                //Source: https://www.json-generator.com/

                var userData = System.IO.File.ReadAllText("Data/UserSeedData.json");
                var users = JsonConvert.DeserializeObject<List<User>>(userData);

                // Add user Roles
                var roles = new List<Role>
                {
                    new Role { Name = "Member" },
                    new Role { Name = "Admin" },
                    new Role { Name = "Moderator" },
                    new Role { Name = "VIP" }
                };

                // Create the roles
                foreach (var role in roles)
                {
                    _roleManager.CreateAsync(role).Wait();
                }

                // Create the users
                foreach (var user in users)
                {
                    user.Photos.SingleOrDefault().IsApproved = true;
                    _userManager.CreateAsync(user, "password").Wait();
                    _userManager.AddToRoleAsync(user, "Member").Wait();
                }

                // We also need to create admin user which will have
                // access to all parts of our application
                var adminUser = new User
                {
                    UserName = "Admin",
                    Gender = "male",
                    Photos = new List<Photo>
                    {
                        new Photo
                        {
                            Url = "https://randomuser.me/api/portraits/men/20.jpg",
                            IsMain = true,
                            Description = "Lorem proident nostrud adipisicing do.",
                            IsApproved = true
                        }
                    }
                };

                var result = _userManager.CreateAsync(adminUser, "password").Result;

                if (result.Succeeded)
                {
                    var admin = _userManager.FindByNameAsync("Admin").Result;
                    _userManager.AddToRolesAsync(admin, new[] { "Admin", "Moderator" }).Wait();
                }
            }            
        }
    }
}
