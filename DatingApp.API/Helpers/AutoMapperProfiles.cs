using AutoMapper;
using DatingApp.API.Dtos;
using DatingApp.API.Models;

namespace DatingApp.API.Helpers
{
    /// <summary>
    /// This will tell AutoMapper about the mappings that we need to support
    /// because AutoMapper needs to understand the source and destination of what it is
    /// mapping.
    /// In order to use the methods, we need to inherit from the Profile class
    /// </summary>
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            // AutoMapper is convention based.
            // Convention based means, if AutoMapper sees a User.Username property and
            // it sees a UserForListDto.Username property, then we don't need to add some
            // configuration as it is smart to know that those properties should map to 
            // each other.  But since we have an UserForListDto.Age and UserForListDto.PhotoUrl
            // property which is not found in the User class, then we need to add a 
            // configuration.
            CreateMap<User, UserForListDto>();
            CreateMap<User, UserForDetailedDto>();
        }
    }
}
