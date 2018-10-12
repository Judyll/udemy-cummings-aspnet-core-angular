using DatingApp.API.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DatingApp.API.Data
{
    public class DatingRepository : IDatingRepository
    {
        private readonly DataContext _context;

        public DatingRepository(DataContext context)
        {
            _context = context;
        }

        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }

        public async Task<User> GetUser(int id)
        {
            // Photo are called 'navigation properties' for the User class
            // Therefore, we can include them in the query by using the 'Include()' method
            var user = await _context.Users.Include(i => i.Photos)
                .FirstOrDefaultAsync(f => f.Id == id);

            return user;
        }

        public async Task<IEnumerable<User>> GetUsers()
        {
            var users = await _context.Users.Include(i => i.Photos)
                .ToListAsync();

            return users;
        }

        public async Task<bool> SaveAll()
        {
            // If there are more than one changes being saved to the database,
            // then this method will return true or else, it will return false
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<Photo> GetPhoto(int id)
        {
            var photo = await _context.Photos.FirstOrDefaultAsync(f => f.Id == id);

            return photo;
        }
    }
}
