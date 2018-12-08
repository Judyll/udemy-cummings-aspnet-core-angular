using DatingApp.API.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        #region Fields
        private readonly DataContext _context;
        #endregion

        #region Ctor
        public AdminController(DataContext context)
        {
            _context = context;
        }
        #endregion

        #region Public Methods

        [Authorize(Policy = "RequireAdminRole")]
        // The route path is usersWithRoles
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

        [Authorize(Policy = "ModeratePhotoRole")]
        // The route path is photosForModeration
        [HttpGet("photosformoderation")]
        public IActionResult GetPhotosForModeration()
        {
            return Ok("Admins or moderators can see this.");
        }

        #endregion
    }
}