using DatingApp.API.Helpers;
using DatingApp.API.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
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

        public async Task<PagedList<User>> GetUsers(UserParams userParams)
        {
            // We don't execute .ToListAsync() here since we will
            // do it on the PagedList<T> class on the 
            // CreateAsync method
            var minDob = DateTime.Today.AddYears(-userParams.MaxAge - 1);
            var maxDob = DateTime.Today.AddYears(-userParams.MinAge);

            var users = _context.Users.Include(i => i.Photos)
                .Where(w => w.Id != userParams.UserId)
                .Where(w => w.Gender == userParams.Gender)
                .Where(w => w.DateOfBirth >= minDob
                    && w.DateOfBirth <= maxDob);

            //if (userParams.MinAge != 18 || userParams.MaxAge != 99)
            //{
            //    var minDob = DateTime.Today.AddYears(-userParams.MaxAge - 1);
            //    var maxDob = DateTime.Today.AddYears(-userParams.MinAge);

            //    users = users.Where(w => w.DateOfBirth >= minDob 
            //        && w.DateOfBirth <= maxDob);
            //}

            return await PagedList<User>.CreateAsync(users, 
                userParams.PageNumber, userParams.PageSize);
        }

        public async Task<bool> SaveAll()
        {
            // If there are one or more changes being saved to the database,
            // then this method will return true or else, it will return false
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<Photo> GetPhoto(int id)
        {
            var photo = await _context.Photos.FirstOrDefaultAsync(f => f.Id == id);

            return photo;
        }

        public async Task<Photo> GetMainPhotoForUser(int userId)
        {
            return await _context.Photos.Where(w => w.UserId == userId)
                .FirstOrDefaultAsync(f => f.IsMain);
        }
    }
}
