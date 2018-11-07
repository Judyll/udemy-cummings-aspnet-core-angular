using DatingApp.API.Models;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options)
            : base(options) { }

        public DbSet<Value> Values { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Photo> Photos { get; set; }
        public DbSet<Like> Likes { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            // We haven't had the need to configure any of our DbSets relationships
            // explicitly yet. We have been OK with what EF does by convention with
            // the relationships of the User and Photos.
            // This time, we will override this OnModelCreating method to further
            // configure the model that was discovered b convention from the entity types
            // We will explicitly configure the relationships between User and Photos entity

            // Our Like entity has two int properties which is the LikerId and LikeeId.
            // We don't have an int of Id only so by convention EF will not know
            // what we want to use for our primary key.  So we need to tell EF about this.
            // What we will use for our primary key is the combination of the
            // LikerId and LikeeId because we don't want a user to like another
            // user more that once.
            builder.Entity<Like>()                
                .HasKey(l => new { l.LikerId, l.LikeeId });

            // We need to tell EF about the entity relationships.
            // We will use Fluent API to define relationships and configure EF
            // so that it will know what it is doing when it creates a new table in
            // our database
            builder.Entity<Like>()
                .HasOne(l => l.Likee)
                .WithMany(l => l.Likers)
                .HasForeignKey(l => l.LikeeId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<Like>()
                .HasOne(l => l.Liker)
                .WithMany(l => l.Likees)
                .HasForeignKey(l => l.LikerId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
