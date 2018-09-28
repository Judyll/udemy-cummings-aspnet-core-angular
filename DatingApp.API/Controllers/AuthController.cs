using DatingApp.API.Data;
using DatingApp.API.Dtos;
using DatingApp.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace DatingApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _config;
        private readonly IAuthRepository _repo;

        public AuthController(IConfiguration config, IAuthRepository repo)
        {
            _config = config;
            _repo = repo;
        }

        // Parameters that we send up from our methods via Http, ASP.NET Core MVC will automatically try to
        // infer the parameters from either the body, from the query string, or from the form.  We can give
        // the RegisterNewUser a hint by adding an attribute [FromBody]
        // for example RegisterNewUser([FromBody]UserForRegisterDto userForRegister).  But since we are using
        // the attribute [ApiController], then this is no longer necessary.  If we remove [ApiController],
        // then we need to use the [FromBody] attribute
        [HttpPost("register")]
        public async Task<IActionResult> RegisterNewUser(UserForRegisterDto userForRegister)
        {
            // If we don't use [ApiController] attribute, then we need to check the ModelState
            // so that the validations specified in the UserForRegisterDto will be triggered
            //if (!ModelState.IsValid)
            //    return BadRequest(ModelState);

            userForRegister.Username = userForRegister.Username.ToLower();

            if (await _repo.UserExists(userForRegister.Username))
            {
                return BadRequest("Username already exists.");
            }

            var userToCreate = new User
            {
                UserName = userForRegister.Username
            };

            var createdUser = await _repo.Register(userToCreate, userForRegister.Password);

            // We will comeback and fix this later since we still don't have any
            // page that shows the created user
            //return CreatedAtRoute()

            // Just return a 201 Created status
            return StatusCode(201);
        }

        [HttpPost("login")]
        public async Task<IActionResult> LoginUser(UserForLoginDto userForLogin)
        {
            throw new Exception("Computer says no!");

            var userFromRepo = await _repo.Login(userForLogin.Username.ToLower(), 
                userForLogin.Password);

            if (userFromRepo != null)
            {
                // Build-up a token that we are going to return to the user.
                // Our token will contain two bits of information about the user -- Id and UserName
                // We can have additional information to this token since this token can be validated by the server
                // without making a database call.  Once the server gets the token, it take a look inside it
                // and it does not need to go to the database to get the username or user Id
                var claims = new[]
                {
                    new Claim(ClaimTypes.NameIdentifier, userFromRepo.Id.ToString()),
                    new Claim(ClaimTypes.Name, userFromRepo.UserName)
                };

                // We also need a key to sign our token and this part is going to be hashed and it is not readable
                // inside our token itself.
                var key = new SymmetricSecurityKey(Encoding.UTF8
                    .GetBytes(_config.GetSection("SecuritySettings:Token").Value));

                // We also need to generate some signing credentials based on the generated key
                var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

                // We also need to create a security token descriptor which will contain our claims,
                // our expiry date for our tokens and the signing credentials
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(claims),
                    Expires = DateTime.Now.AddDays(1),
                    SigningCredentials = creds
                };

                // We also need a token handler
                var tokenHandler = new JwtSecurityTokenHandler();

                var token = tokenHandler.CreateToken(tokenDescriptor);

                return Ok(new
                {
                    token = tokenHandler.WriteToken(token)
                });
            }

            // Return a general unauthorized instead if saying the username is correct
            // but the password is wrong so to avoid bruteforcing the password
            return Unauthorized();
        }

    }
}
