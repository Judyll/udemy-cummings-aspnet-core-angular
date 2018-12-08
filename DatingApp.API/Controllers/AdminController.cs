using DatingApp.API.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using DatingApp.API.Models;
using DatingApp.API.Dtos;

namespace DatingApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        #region Fields
        private readonly DataContext _context;
        private readonly UserManager<User> _userManager;
        #endregion

        #region Ctor
        public AdminController(DataContext context, UserManager<User> userManager)
        {
            _context = context;
            _userManager = userManager;
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
                selectedRoles.Except(selectedRoles));

            if (!result.Succeeded)
                return BadRequest("Failed to remove the roles.");

            // Return the new list of roles the user is a member of
            return Ok(await _userManager.GetRolesAsync(user));
        }  

        [Authorize(Policy = "ModeratePhotoRole")]
        // The route path is photosformoderation
        [HttpGet("photosformoderation")]
        public IActionResult GetPhotosForModeration()
        {
            return Ok("Admins or moderators can see this.");
        }

        #endregion
    }
}