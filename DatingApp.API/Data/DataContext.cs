using DatingApp.API.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.API.Data
{
    // Instead of inheriting from DbContext, we will now inherit
    // from IdentityDbContext since this will give us now the support
    // for entity-framework classes for Identity
    // We need to add configurations and types because of how we are using
    // this and most of what we are doing is purely based on the need to
    // have the Id as integers instead of string and for
    // one particular query which is to get the users along with their roles.
    // If we don't configure it this way, then we can't get the query to get
    // the roles along side with the users.
    public class DataContext : IdentityDbContext<User, Role, int, 
        IdentityUserClaim<int>, UserRole, IdentityUserLogin<int>, 
        IdentityRoleClaim<int>, IdentityUserToken<int>>
    {
        public DataContext(DbContextOptions<DataContext> options)
            : base(options) { }

        public DbSet<Value> Values { get; set; }

        // We no longer needed the Users dbset since this will now be coming
        // from Asp.net Core Identity
        //public DbSet<User> Users { get; set; }

        public DbSet<Photo> Photos { get; set; }
        public DbSet<Like> Likes { get; set; }
        public DbSet<Message> Messages { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            // Since we are using the IdentityDbContext now, we need to call
            // this method on base so that this will configure the schema
            // needed for the identity framework
            base.OnModelCreating(builder);

            // We are adding configuration for the UserRole entity
            // so that our entity framework will know the relationship
            // between the User, Role, and UserRole entity because
            // a user can have one or many roles, and the roles and be
            // assign to one or many users
            builder.Entity<UserRole>(userRole => {

                // The key for this entity will be made up of the UserId
                // and the RoleId
                userRole.HasKey(ur => new { ur.UserId, ur.RoleId });

                userRole.HasOne(ur => ur.Role)
                    .WithMany(ur => ur.UserRoles)
                    .HasForeignKey(ur => ur.RoleId)
                    .IsRequired();

                userRole.HasOne(ur => ur.User)
                    .WithMany(ur => ur.UserRoles)
                    .HasForeignKey(ur => ur.UserId)
                    .IsRequired();
            });
                
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

            // Configure the relationship for the Messages entity
            builder.Entity<Message>()
                .HasOne(m => m.Sender)
                .WithMany(m => m.MessagesSent)
                .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<Message>()
                .HasOne(m => m.Recipient)
                .WithMany(m => m.MessagesReceived)
                .OnDelete(DeleteBehavior.Restrict);

            // We are adding a global query filter -- https://docs.microsoft.com/en-us/ef/core/querying/filters
            // and we are only globally sending photos which are approved.  
            // This means 'all' APIs accessing this datacontext will only get the photos
            // that are approved.
            builder.Entity<Photo>().HasQueryFilter(p => p.IsApproved);
        }
    }
}
