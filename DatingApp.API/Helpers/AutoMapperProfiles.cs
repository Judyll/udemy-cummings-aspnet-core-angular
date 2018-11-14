using AutoMapper;
using DatingApp.API.Dtos;
using DatingApp.API.Models;
using System.Linq;

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
            CreateMap<User, UserForListDto>()
                // This allows us to customize configuration for individual member
                // in our class
                // The first part of this method is the destination and then we will
                // give it some options and add the source value for the destination
                // property PhotoUrl
                .ForMember(destination => destination.PhotoUrl, options => {
                    options.MapFrom(source => 
                    source.Photos.FirstOrDefault(f => f.IsMain).Url);
                })
                // For the Age, we don't have any source property we can directly map
                // since this field should be calculated.
                // We can use ResolveUsing to resolve destination member using a custom
                // value resolver callback
                // We will add in the DatingApp.API.Helpers.Extensions a method that will
                // compute the age
                .ForMember(destination => destination.Age, options => {
                    options.ResolveUsing(r => r.DateOfBirth.CalculateAge());
                });
            CreateMap<User, UserForDetailedDto>()
                .ForMember(destination => destination.PhotoUrl, options => {
                    options.MapFrom(source =>
                    source.Photos.FirstOrDefault(f => f.IsMain).Url);
                })
                .ForMember(destination => destination.Age, options => {
                    options.ResolveUsing(r => r.DateOfBirth.CalculateAge());
                });
            CreateMap<Photo, PhotoForDetailedDto>();
            CreateMap<UserForUpdateDto, User>();
            CreateMap<Photo, PhotoForReturnDto>();
            CreateMap<PhotoForCreationDto, Photo>();
            CreateMap<UserForRegisterDto, User>();

            // We are using .ReverseMap() so that we can chain this mapping
            // to create a mapping Message to MessageForCreationDto and mapping
            // also MessageForCreationDto to Message.
            CreateMap<MessageForCreationDto, Message>().ReverseMap();
        }
    }
}
