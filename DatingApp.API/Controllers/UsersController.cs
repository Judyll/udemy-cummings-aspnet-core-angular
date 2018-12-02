using AutoMapper;
using DatingApp.API.Data;
using DatingApp.API.Dtos;
using DatingApp.API.Helpers;
using DatingApp.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;

namespace DatingApp.API.Controllers
{
    // Since we are adding this on top of the controller, any time the controller
    // methods are being called, we are going to make use of our LogUserActivity
    // action filter which in turn update the last active property for the particular
    // user
    [ServiceFilter(typeof(LogUserActivity))]
    //[Authorize] -- We are now removing this attribute since we are globally specifying
    // authorization in the the Startup.cs class:
    //services.AddMvc(options => {
    //            var policy = new AuthorizationPolicyBuilder()
    //                // This is going to require authentication globally
    //                .RequireAuthenticatedUser()
    //                .Build();
    //options.Filters.Add(new AuthorizeFilter(policy));
    //        })
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IDatingRepository _repo;
        private readonly IMapper _mapper;

        // IMapper is injected from the Startup.cs class -- services.AddAutoMapper();
        public UsersController(IDatingRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        // GET: api/Users
        /// <summary>
        /// 
        /// </summary>
        /// <param name="userParams">Typically, .NET CORE will figure out where to
        /// get the parameters from.  But we will give it a hint [FromQuery] so
        /// this will allow us to send an empty query string and .NET CORE
        /// will use the default values we specified in the UserParams class</param>
        /// <returns></returns>
        [HttpGet]
        public async Task<IActionResult> GetUsers([FromQuery]UserParams userParams)
        {
            var currentUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            var userFromRepo = await _repo.GetUser(currentUserId);

            userParams.UserId = currentUserId;

            if (string.IsNullOrEmpty(userParams.Gender))
                userParams.Gender = string.Equals(userFromRepo.Gender.ToLowerInvariant(), "male") 
                    ? "female" : "male";

            var users = await _repo.GetUsers(userParams);

            var usersToReturn = _mapper.Map<IEnumerable<UserForListDto>>(users);

            // Since we are on the controller, then we have access to 
            // 'Response' which is of type HttpResponse.  And we can call
            // our extension method for the HttpResponse which is AddPagination
            // that we have created in Extensions.cs
            // Remember, we are passing this as an header to the client
            Response.AddPagination(users.CurrentPage, users.PageSize,
                users.TotalCount, users.TotalPages);

            return Ok(usersToReturn);
        }

        // GET: api/Users/5
        // We need to add the 'Name' attribute since we will be using this
        // as a return route for the 'RegisterNewUser' method in the AuthController
        [HttpGet("{id}", Name = "GetUser")]
        public async Task<IActionResult> GetUser([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var userFromRepo = await _repo.GetUser(id);

            if (userFromRepo == null)
                return NotFound();

            var userToReturn = _mapper.Map<UserForDetailedDto>(userFromRepo);

            return Ok(userToReturn);
        }

        // PUT: api/Users/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser([FromRoute] int id, 
            [FromBody] UserForUpdateDto userForUpdateDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // The first thing that we want to do is to check the user that is
            // attempting to update their profile matches the token that the
            // service is receiving. On the AuthController at line #77, we are
            // setting the ClaimTypes.NameIdentifier equal to the user identifier
            if (id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var userFromRepo = await _repo.GetUser(id);

            // Get the information from the userForUpdateDto and map it to 
            // the userFromRepo
            _mapper.Map(userForUpdateDto, userFromRepo);

            // If this is successful, then we will just return NoContent();
            if (await _repo.SaveAll())
                return NoContent();

            throw new Exception($"Updating user {id} failed on saved.");
        }

        [HttpPost("{id}/like/{recipientId}")]
        public async Task<IActionResult> LikeUser(int id, int recipientId)
        {
            // The first thing that we want to do is to check the user that is
            // attempting to update their profile matches the token that the
            // service is receiving. On the AuthController at line #77, we are
            // setting the ClaimTypes.NameIdentifier equal to the user identifier
            if (id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            // Check if the like exists
            var like = await _repo.GetLike(id, recipientId);

            if (like != null)
                return BadRequest("You already liked this user.");

            if (await _repo.GetUser(recipientId) == null)
                return NotFound();

            like = new Like
            {
                LikerId = id,
                LikeeId = recipientId
            };

            _repo.Add(like);

            if (await _repo.SaveAll())
                return Ok();

            return BadRequest("Failed to like user.");
        }
    }
}