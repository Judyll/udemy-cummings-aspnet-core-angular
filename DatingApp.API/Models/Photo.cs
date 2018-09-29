using System;

namespace DatingApp.API.Models
{
    public class Photo
    {
        public int Id { get; set; }

        public string Url { get; set; }

        public string Description { get; set; }

        public DateTime DateAdded { get; set; }

        public bool IsMain { get; set; }

        // We need to add these properties so that EF will know that we want
        // a cascade delete rather than a restricted delete which means if the
        // user will be deleted, then photos associated with the user will also be deleted
        public User User { get; set; }

        public int UserId { get; set; }
        // -----------------
    }
}