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

        public Seed(UserManager<User> userManager)
        {
            _userManager = userManager;
        }        

        public void SeedUsers()
        {
            if (!_userManager.Users.Any())
            {
                //Source: https://www.json-generator.com/

                var userData = System.IO.File.ReadAllText("Data/UserSeedData.json");
                var users = JsonConvert.DeserializeObject<List<User>>(userData);

                foreach (var user in users)
                {
                    _userManager.CreateAsync(user, "password").Wait();
                }
            }            
        }
    }
}
