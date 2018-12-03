using DatingApp.API.Models;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace DatingApp.API.Data
{
    public class Seed
    {
        private readonly DataContext _context;

        public Seed(DataContext context)
        {
            _context = context;
        }

        public void SeedUsers()
        {
            if (!_context.Users.Any())
            {
                //Source: https://www.json-generator.com/

                var userData = System.IO.File.ReadAllText("Data/UserSeedData.json");
                var users = JsonConvert.DeserializeObject<List<User>>(userData);

                foreach (var user in users)
                {
                    CreatePasswordHash("password", out byte[] passwordHash,
                        out byte[] passwordSalt);

                    // Since we are no using ASP.NET Core Identity, we no longer need
                    // to hash the password ourselves.
                    //user.PasswordHash = passwordHash;
                    //user.PasswordSalt = passwordSalt;

                    user.UserName = user.UserName.ToLower();

                    _context.Users.Add(user);
                }

                _context.SaveChanges();
            }            
        }

        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            // This not the only way to secure a password
            // HMAC -- Hash-based Message Authentication Code
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                // We will use this key/salt to unlock the password hash
                passwordSalt = hmac.Key;
                // We need to provide our password as byte array by using Text.Encoding
                passwordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
            }
        }
    }
}
