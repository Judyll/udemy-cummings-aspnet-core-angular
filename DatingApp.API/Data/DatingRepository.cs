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
        #region Fields

        private readonly DataContext _context;

        #endregion

        #region Ctor

        public DatingRepository(DataContext context)
        {
            _context = context;
        }

        #endregion

        #region Methods

        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }

        public async Task<User> GetUser(int id, bool isCurrentUser)
        {
            // Photo are called 'navigation properties' for the User class
            // Therefore, we can include them in the query by using the 'Include()' method
            var query = _context.Users.Include(p => p.Photos).AsQueryable();

            // In our DataContext.OnModelCreating method, we are adding the global filter
            // builder.Entity<Photo>().HasQueryFilter(p => p.IsApproved);
            // to only return the photos that are approved.
            // So, we need to check if it is the current user.  If true, then we will
            // need to call the .IgnoreQueryFilter() so that we can
            // send all the photos regardless if it is approved or not.
            if (isCurrentUser)
                query = query.IgnoreQueryFilters();

            var user = await query.FirstOrDefaultAsync(u => u.Id == id);

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
                    && w.DateOfBirth <= maxDob)
                .OrderByDescending(o => o.LastActive)
                .AsQueryable();

            // Our 'Like' entity just contain list of integers
            // Therefore, we will retrieve those list of integers
            // using a private method, and then we will query those
            // 'User' information based on those list of integers
            // which are also User Ids.
            if (userParams.Likers)
            {
                var userLikers = await GetUserLikes(userParams.UserId,
                    userParams.Likers);

                users = users.Where(u => userLikers.Contains(u.Id));
            }

            if (userParams.Likees)
            {
                var userLikees = await GetUserLikes(userParams.UserId,
                    userParams.Likers);

                users = users.Where(u => userLikees.Contains(u.Id));
            }

            //if (userParams.MinAge != 18 || userParams.MaxAge != 99)
            //{
            //    var minDob = DateTime.Today.AddYears(-userParams.MaxAge - 1);
            //    var maxDob = DateTime.Today.AddYears(-userParams.MinAge);

            //    users = users.Where(w => w.DateOfBirth >= minDob 
            //        && w.DateOfBirth <= maxDob);
            //}

            if (!string.IsNullOrEmpty(userParams.OrderBy))
            {
                switch (userParams.OrderBy)
                {
                    case "created":
                        users = users.OrderByDescending(u => u.Created);
                        break;
                    default:
                        users = users.OrderByDescending(u => u.LastActive);
                        break;
                }
            }

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
            // In our DataContext.OnModelCreating method, we are adding the global filter
            // builder.Entity<Photo>().HasQueryFilter(p => p.IsApproved);
            // to only return the photos that are approved.
            // So, for getting an individual photo, then we are just adding the
            // .IgnoreQueryFilters() method to return any photo either approved or not
            var photo = await _context.Photos
                .IgnoreQueryFilters()
                .FirstOrDefaultAsync(f => f.Id == id);

            return photo;
        }

        public async Task<Photo> GetMainPhotoForUser(int userId)
        {
            return await _context.Photos.Where(w => w.UserId == userId)
                .FirstOrDefaultAsync(f => f.IsMain);
        }

        public async Task<Like> GetLike(int userId, int recipientId)
        {
            // If the userId - recipientId does not exists, this method
            // will return null
            return await _context.Likes.FirstOrDefaultAsync(l => l.LikerId == userId
                && l.LikeeId == recipientId);
        }

        public async Task<Message> GetMessage(int id)
        {
            return await _context.Messages.FirstOrDefaultAsync(m => m.Id == id);
        }

        public async Task<PagedList<Message>> GetMessagesForUser(MessageParams messageParams)
        {
            var messages = _context.Messages
                .Include(m => m.Sender).ThenInclude(u => u.Photos)
                .Include(m => m.Recipient).ThenInclude(u => u.Photos)
                .AsQueryable();

            switch (messageParams.MessageContainer.ToLower())
            {
                case "inbox":
                    messages = messages.Where(m => m.RecipientId == messageParams.UserId
                        && m.RecipientDeleted == false);
                    break;
                case "outbox":
                    messages = messages.Where(m => m.SenderId == messageParams.UserId
                        && m.SenderDeleted == false);
                    break;
                default:
                    messages = messages.Where(m => m.RecipientId == messageParams.UserId 
                        && m.IsRead == false && m.RecipientDeleted == false);
                    break;
            }

            messages = messages.OrderByDescending(m => m.MessageSent);

            return await PagedList<Message>.CreateAsync(messages, 
                messageParams.PageNumber, messageParams.PageSize);
        }

        public async Task<IEnumerable<Message>> GetMessageThread(int userId, int recipientId)
        {
            var messages = await _context.Messages
                .Include(m => m.Sender).ThenInclude(u => u.Photos)
                .Include(m => m.Recipient).ThenInclude(u => u.Photos)
                .Where(m => m.RecipientId == userId && m.RecipientDeleted == false 
                    && m.SenderId == recipientId
                    || m.RecipientId == recipientId && m.SenderDeleted == false 
                    && m.SenderId == userId)
                .OrderByDescending(m => m.MessageSent)
                .ToListAsync();

            return messages;
        }

        #endregion

        #region Utilities

        private async Task<IEnumerable<int>> GetUserLikes(int id, bool likers)
        {
            var user = await _context.Users
                .Include(u => u.Likers)
                .Include(u => u.Likees)
                .FirstOrDefaultAsync(u => u.Id == id);

            if (likers)
                return user.Likers.Where(u => u.LikeeId == id).Select(u => u.LikerId);

            return user.Likees.Where(u => u.LikerId == id).Select(u => u.LikeeId);
        }
        #endregion
    }
}
