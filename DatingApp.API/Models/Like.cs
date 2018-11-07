namespace DatingApp.API.Models
{
    public class Like
    {
        // This is the user Id for the main user that likes another user
        public int LikerId { get; set; }

        // This is the user Id for the user being liked by the main user
        public int LikeeId { get; set; }

        public User Liker { get; set; }

        public User Likee { get; set; }
    }
}
