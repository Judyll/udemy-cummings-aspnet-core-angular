using DatingApp.API.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Text;
using System.Threading.Tasks;

namespace DatingApp.API.Data
{
    public class AuthRepository : IAuthRepository
    {
        private readonly DataContext _context;

        public AuthRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<User> Login(string username, string password)
        {
            var user = await _context.Users
                .Include(i => i.Photos)
                .FirstOrDefaultAsync(f => f.UserName.Equals(username.Trim(),
                StringComparison.InvariantCultureIgnoreCase));

            if (user == null)
                return null;

            // Since we are now using ASP.NET Core Identity, we no longer need
            // to verify the password ourselves.
            //if (user != null 
            //    && VerifyPasswordHash(password, user.PasswordHash, user.PasswordSalt))
            //{
            //    return user;
            //}

            return null;
        }

        public async Task<User> Register(User user, string password)
        {
            CreatePasswordHash(password, out byte[] passwordHash, out byte[] passwordSalt);

            // Since we are no using ASP.NET Core Identity, we no longer need
            // to hash the password ourselves.
            //user.PasswordHash = passwordHash;
            //user.PasswordSalt = passwordSalt;

            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();

            return user;
        }        

        public async Task<bool> UserExists(string username)
        {
            if (await _context.Users.AnyAsync(a => a.UserName.Equals(username.Trim(),
                StringComparison.InvariantCultureIgnoreCase)))
            {
                return true;
            }

            return false;
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

        private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            // This not the only way to secure a password
            // HMAC -- Hash-based Message Authentication Code
            using (var hmac = new System.Security.Cryptography.HMACSHA512(passwordSalt))
            {
                var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));

                for (int i = 0; i < computedHash.Length; i++)
                {
                    if (computedHash[i] != passwordHash[i])
                        return false;
                }                
            }

            return true;
        }
    }
}
