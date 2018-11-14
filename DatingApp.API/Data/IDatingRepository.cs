using DatingApp.API.Helpers;
using DatingApp.API.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DatingApp.API.Data
{
    public interface IDatingRepository
    {
        // This is a generic method
        // In our case, T might be a type of User class or type of Photo class
        // And we contraint the method to accept only type of 'class' 
        // by using the where clause
        void Add<T>(T entity) where T : class;

        void Delete<T>(T entity) where T : class;

        Task<bool> SaveAll();

        Task<PagedList<User>> GetUsers(UserParams userParams);

        Task<User> GetUser(int id);

        Task<Photo> GetPhoto(int id);

        Task<Photo> GetMainPhotoForUser(int userId);

        Task<Like> GetLike(int userId, int recipientId);

        /// <summary>
        /// Get the specific message based on Id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        Task<Message> GetMessage(int id);

        /// <summary>
        /// This method will support the inbox and outbox for the messages
        /// </summary>
        /// <returns></returns>
        Task<PagedList<Message>> GetMessagesForUser();

        /// <summary>
        /// This method will be the conversation between two users.
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="recipientId"></param>
        /// <returns></returns>
        Task<IEnumerable<Message>> GetMessageThread(int userId, int recipientId);
    }
}
