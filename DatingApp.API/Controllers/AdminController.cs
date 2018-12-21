using DatingApp.API.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using DatingApp.API.Models;
using DatingApp.API.Dtos;
using Microsoft.Extensions.Options;
using DatingApp.API.Helpers;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;

namespace DatingApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        #region Fields
        private readonly DataContext _context;
        private readonly UserManager<User> _userManager;
        private readonly IOptions<CloudinarySettings> _cloudinaryConfig;
        private readonly Cloudinary _cloudinary;
        #endregion

        #region Ctor
        public AdminController(DataContext context, UserManager<User> userManager, 
            IOptions<CloudinarySettings> cloudinaryConfig)
        {
            _context = context;
            _userManager = userManager;
            _cloudinaryConfig = cloudinaryConfig;

            Account acc = new Account(
                _cloudinaryConfig.Value.CloudName,
                _cloudinaryConfig.Value.ApiKey,
                _cloudinaryConfig.Value.ApiSecret
            );

            _cloudinary = new Cloudinary(acc);
        }
        #endregion

        #region Public Methods

        [Authorize(Policy = "RequireAdminRole")]
        // The route path is userswithroles
        [HttpGet("userswithroles")]
        public async Task<IActionResult> GetUserWithRoles()
        {
            var userList = await (from user in _context.Users orderby user.UserName
                                  select new
                                  {
                                      user.Id,
                                      user.UserName,
                                      Roles = (from userRole in user.UserRoles
                                               join role in _context.Roles on userRole.RoleId equals role.Id
                                               select role.Name).ToList()
                                  }).ToListAsync();

            return Ok(userList);
        }

        [Authorize(Policy = "RequireAdminRole")]
        [HttpPost("editroles/{userName}")]
        public async Task<IActionResult> EditRoles(string userName, RoleEditDto roleEditDto)
        {
            var user = await _userManager.FindByNameAsync(userName);

            var userRoles = await _userManager.GetRolesAsync(user);

            // There is a chance that the user will be removed from all roles.
            // If they are, then we are just going to create a new empty object
            // of type string array
            var selectedRoles = roleEditDto.RoleNames ?? new string[] { };

            // We need to add in the user to roles that they are not
            // yet a member of
            var result = await _userManager.AddToRolesAsync(user,
                selectedRoles.Except(userRoles));

            if (!result.Succeeded)
                return BadRequest("Failed to add to roles.");

            // We need to remove in the roles that has been deselected
            // from the list in the SPA
            result = await _userManager.RemoveFromRolesAsync(user, 
                userRoles.Except(selectedRoles));

            if (!result.Succeeded)
                return BadRequest("Failed to remove the roles.");

            // Return the new list of roles the user is a member of
            return Ok(await _userManager.GetRolesAsync(user));
        }  

        [Authorize(Policy = "ModeratePhotoRole")]
        // The route path is photosformoderation
        [HttpGet("photosformoderation")]
        public async Task<IActionResult> GetPhotosForModeration()
        {
            var photos = await _context.Photos
                // We are including the user information since we need to display
                // it in together with the photo
                .Include(u => u.User)
                // We are ingoring the filters to include the photos that is not
                // approved yet
                .IgnoreQueryFilters()
                .Where(p => p.IsApproved == false)
                .Select(u => new
                {
                    u.Id,
                    u.User.UserName,
                    u.Url,
                    u.IsApproved
                }).ToListAsync();

            return Ok(photos);
        }

        [Authorize(Policy = "ModeratePhotoRole")]
        [HttpPost("approvephoto/{photoId}")]
        public async Task<IActionResult> ApprovePhoto(int photoId)
        {
            var photo = await _context.Photos
                .IgnoreQueryFilters()
                .FirstOrDefaultAsync(p => p.Id == photoId);

            if (photo == null)
                return BadRequest("Photo does not exists.");

            photo.IsApproved = true;

            await _context.SaveChangesAsync();

            return Ok();
        }

        [Authorize(Policy = "ModeratePhotoRole")]
        [HttpPost("rejectphoto/{photoId}")]
        public async Task<IActionResult> RejectPhoto(int photoId)
        {
            var photo = await _context.Photos
                .IgnoreQueryFilters()
                .FirstOrDefaultAsync(p => p.Id == photoId);

            if (photo == null)
                return BadRequest("Photo does not exists.");

            if (photo.IsMain)
                return BadRequest("You cannot reject the main photo.");

            // Check if the photo has a public Id.  If it does, then it is a cloudinary
            // photo and we will delete it in cloudinary
            if (photo.PublicId != null)
            {
                var deleteParams = new DeletionParams(photo.PublicId);

                var result = _cloudinary.Destroy(deleteParams);

                if (result.Result == "ok")
                    _context.Photos.Remove(photo);
            }

            if (photo.PublicId == null)
            {
                _context.Photos.Remove(photo);
            }

            await _context.SaveChangesAsync();

            return Ok();
        }

        #endregion
    }
}