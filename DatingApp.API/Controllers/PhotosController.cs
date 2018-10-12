using AutoMapper;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using DatingApp.API.Data;
using DatingApp.API.Dtos;
using DatingApp.API.Helpers;
using DatingApp.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace DatingApp.API.Controllers
{
    [Authorize]
    [Route("api/users/{userId}/photos")]
    [ApiController]
    public class PhotosController : ControllerBase
    {
        //private readonly DataContext _context;
        private readonly IDatingRepository _repo;
        private readonly IMapper _mapper;

        // Bring in our Cloudinary configuration through IOptions since
        // we provided it as a service in the Startup.cs class
        private readonly IOptions<CloudinarySettings> _cloudinaryConfig;

        private readonly Cloudinary _cloudinary;

        public PhotosController(IDatingRepository repo, IMapper mapper, 
            IOptions<CloudinarySettings> cloudinaryConfig)
        {
            _repo = repo;
            _mapper = mapper;
            _cloudinaryConfig = cloudinaryConfig;

            // Set-up a Cloudinary account
            Account account = new Account(
                _cloudinaryConfig.Value.CloudName,
                _cloudinaryConfig.Value.ApiKey,
                _cloudinaryConfig.Value.ApiSecret
            );

            _cloudinary = new Cloudinary(account);
        }

        // The int userId value will be coming from the route api/users/{userId}/photos
        // as specified in the Route attribute and not the usual api/photos/5 route
        [HttpPost]
        public async Task<IActionResult> AddPhotoForUser(int userId,
            PhotoForCreationDto photoForCreationDto)
        {
            // The first thing that we want to do is to check the user that is
            // attempting to update their profile matches the token that the
            // service is receiving. On the AuthController at line #77, we are
            // setting the ClaimTypes.NameIdentifier equal to the user identifier
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            {
                return Unauthorized();
            }

            var userFromRepo = await _repo.GetUser(userId);

            // Store the file that will be send to the storage
            var file = photoForCreationDto.File;

            // Store the result that we get back from Cloudinary
            var uploadResult = new ImageUploadResult();

            if (file.Length > 0)
            {
                // Read the file into a memory and dispose it right after using
                using (var stream = file.OpenReadStream())
                {
                    var uploadParams = new ImageUploadParams
                    {
                        File = new FileDescription(file.Name, stream),
                        // Transform the image that if we have created a very long photo
                        // for instance of the user, Cloudinary is gonna crop the image
                        // for us focusing on the face and crop the image around the face
                        // and return a square image
                        Transformation = new Transformation()
                        .Width(500).Height(500)
                        .Crop("fill")
                        .Gravity("face")
                    };

                    uploadResult = _cloudinary.Upload(uploadParams);
                }
            }

            photoForCreationDto.Url = uploadResult.Uri.ToString();
            photoForCreationDto.PublicId = uploadResult.PublicId;

            var photo = _mapper.Map<Photo>(photoForCreationDto);

            // Check if this is the first photo the user is uploading
            if (!userFromRepo.Photos.Any(a => a.IsMain))
            {
                photo.IsMain = true;
            }

            userFromRepo.Photos.Add(photo);

            if (await _repo.SaveAll())
            {
                // Because this is an HttpPost, what we are supposed to return is a
                // CreatedAtRoute so that we will return a location header with the location
                // of the created result
                return Ok();
            }

            return BadRequest("Could not add the photo");
        }
    }
}