using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DatingApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        [Authorize(Policy = "RequireAdminRole")]
        // The route path is usersWithRoles
        [HttpGet("userswithroles")]
        public IActionResult GetUserWithRoles()
        {
            return Ok("Only admins can see this.");
        }

        [Authorize(Policy = "ModeratePhotoRole")]
        // The route path is photosForModeration
        [HttpGet("photosformoderation")]
        public IActionResult GetPhotosForModeration()
        {
            return Ok("Admins or moderators can see this.");
        }
    }
}