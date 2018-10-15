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

        // Create a route when {id} is the Id of the photo
        // and we give it a name of "GetPhoto" since we need to pass
        // a route name in the CreatedAtRoute return type of the AddPhotoForUser method
        [HttpGet("{id}", Name = "GetPhoto")]
        public async Task<IActionResult> GetPhoto(int id)
        {
            var photoFromRepo = await _repo.GetPhoto(id);

            // The photoFromRepo also included all the user details as well because that
            // is the navigation property on our photo.  We need to map this to return
            // to a photo fields that we need only.
            var photo = _mapper.Map<PhotoForReturnDto>(photoFromRepo);

            return Ok(photo);
        }

        // The int userId value will be coming from the route api/users/{userId}/photos
        // as specified in the Route attribute and not the usual api/photos/5 route
        // We add the [FromForm] code to tell ASP.NET core that our payload is coming
        // from a form in which it is how we used also in Postman
        [HttpPost]
        public async Task<IActionResult> AddPhotoForUser(int userId,
            [FromForm]PhotoForCreationDto photoForCreationDto)
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
                // We will create a photo to return object since we cannot return "var photo"
                // object because it contains the user navigation properties
                // We must have this inside the SaveAll() so that we can have the photo Id
                // generated by the sql server.
                var photoToReturn = _mapper.Map<PhotoForReturnDto>(photo);

                // Because this is an HttpPost, what we are supposed to return is a
                // CreatedAtRoute so that we will return a location header with the location
                // of the created result.
                // This will return an Http status code of 201.
                // In the first parameter, we need to provide it a string of routeName which
                // means we need to provide the location of the resource we have just 
                // created which also means we need
                // to provide a "route" to actually get an individual photo ---
                // The second parameter needs an object routeValues and in this case, we need
                // to pass the Id of the photo we are going to return
                // The third parameter is the object value which is the entity that
                // we are actually returning which is our photo object
                return CreatedAtRoute("GetPhoto", new { id = photoToReturn.Id }, 
                    photoToReturn);
            }

            return BadRequest("Could not add the photo");
        }

        // Add a method to update the main photo.  Technically, we are updating a resource
        // and in a RESTful API, when you are updating a resouce, typically that would be
        // an HttpPut or HttpPatch.  But, for relatively simple changes like changing a
        // property from false to true, it's not uncommon to see an API using an 
        // HttpPost for such a simple change. And whilst in order to make the API completely 
        // restful for we should abide by restful principles. We tend to take a more 
        // pragmatic approach with an API so we sometimes prepared to sacrifice a little
        // bit of restfulness just to have cleaner less unwieldy code for operations such 
        // as this and it's probably more equivalent what we're doing now to some sort 
        // of our RPC (Remote Procedure Call) call than an actual restful API.
        // The below method this is going to take an I.D. and this will be the Id 
        // of the photo and will add another part to this route and call it a setMain.
        // And this is the path we use so in order to set the photo as main 
        // we simply pass up an HttpPost requests simply to the below route
        // and will send up an empty body and just use the Id to set the main 
        // photo or to set the IS main property of the photo to true.

        [HttpPost("{id}/setMain")]
        public async Task<IActionResult> SetMainPhoto(int userId, int id)
        {
            // The first thing that we want to do is to check the user that is
            // attempting to update their profile matches the token that the
            // service is receiving. On the AuthController at line #77, we are
            // setting the ClaimTypes.NameIdentifier equal to the user identifier
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var userFromRepo = await _repo.GetUser(userId);

            if (!userFromRepo.Photos.Any(a => a.Id == id))
                return Unauthorized();

            var photoToChange = await _repo.GetPhoto(id);

            if (photoToChange.IsMain)
                return BadRequest("This is already the main photo.");

            var currentMainPhoto = await _repo.GetMainPhotoForUser(userId);

            currentMainPhoto.IsMain = false;

            photoToChange.IsMain = true;

            if (await _repo.SaveAll())
                return NoContent();

            return BadRequest("Could not set photo to main.");
        }
    }
}