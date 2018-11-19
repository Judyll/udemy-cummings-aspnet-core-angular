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
    [Authorize]
    [Route("api/users/{userId}/[controller]")]
    [ApiController]
    public class MessagesController : ControllerBase
    {
        private readonly IDatingRepository _repo;
        private readonly IMapper _mapper;

        // IMapper is injected from the Startup.cs class -- services.AddAutoMapper();
        public MessagesController(IDatingRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        [HttpGet("{id}", Name = "GetMessage")]
        public async Task<IActionResult> GetMessage(int userId, int id)
        {
            // The first thing that we want to do is to check the user that is
            // attempting to update their profile matches the token that the
            // service is receiving. On the AuthController at line #77, we are
            // setting the ClaimTypes.NameIdentifier equal to the user identifier
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var messageFromRepo = await _repo.GetMessage(id);

            if (messageFromRepo == null)
                return NotFound();

            return Ok(messageFromRepo);
        }

        [HttpGet]
        public async Task<IActionResult> GetMessagesForUser(int userId, 
            [FromQuery]MessageParams messageParams)
        {
            // The first thing that we want to do is to check the user that is
            // attempting to update their profile matches the token that the
            // service is receiving. On the AuthController at line #77, we are
            // setting the ClaimTypes.NameIdentifier equal to the user identifier
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            messageParams.UserId = userId;

            var messagesFromRepo = await _repo.GetMessagesForUser(messageParams);

            var messages = _mapper.Map<IEnumerable<MessageToReturnDto>>(messagesFromRepo);

            Response.AddPagination(messagesFromRepo.CurrentPage, messagesFromRepo.PageSize,
                messagesFromRepo.TotalCount, messagesFromRepo.TotalPages);

            return Ok(messages);
        }

        // We cannot use HttpGet("{recipientId}") because .NET CORE cannot determine the 
        // difference betweent the existing route which is the HttpGet("{id}", Name = "GetMessage")
        // even if we use 'recipientId' and 'id' as keywords
        [HttpGet("thread/{recipientId}")]
        public async Task<IActionResult> GetMessageThread(int userId, int recipientId)
        {
            // The first thing that we want to do is to check the user that is
            // attempting to update their profile matches the token that the
            // service is receiving. On the AuthController at line #77, we are
            // setting the ClaimTypes.NameIdentifier equal to the user identifier
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var messagesFromRepo = await _repo.GetMessageThread(userId, recipientId);

            var messageThread = _mapper.Map<IEnumerable<MessageToReturnDto>>(messagesFromRepo);

            return Ok(messageThread);
        }

        [HttpPost]
        public async Task<IActionResult> CreateMessage(int userId, 
            MessageForCreationDto messageForCreationDto)
        {
            // We will get the complete sender information and store it
            // in memory so that AutoMapper can do some magic and automatically
            // harvest any information from the memory once we do mapping
            var sender = await _repo.GetUser(userId);

            // The first thing that we want to do is to check the user that is
            // attempting to update their profile matches the token that the
            // service is receiving. On the AuthController at line #77, we are
            // setting the ClaimTypes.NameIdentifier equal to the user identifier
            if (sender.Id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            messageForCreationDto.SenderId = userId;

            // We are getting the recipient information from our repo but
            // after that, we don't include that information as part of the 
            // return data.  But, with AutoMapper's magic, since the recipient
            // information is already in memory, it maps it automatically
            // when we call var messageToReturn = _mapper.Map<MessageToReturnDto>(message);
            var recipient = await _repo.GetUser(messageForCreationDto.RecipientId);

            if (recipient == null)
                return BadRequest("Could not find user.");

            var message = _mapper.Map<Message>(messageForCreationDto);

            _repo.Add(message);

            if (await _repo.SaveAll())
            {
                // After we added the message to our repository, we don't need to map this 
                // back into a DTO so that we can return it.  What we are using for our
                // MessageForCreationDto is good enough for our purposes to send back to
                // our user.  That is why in the AutoMapperProfiles, we are using the
                // .ReverseMap() method to chain the mapping of the Message to MessageForCreationDto
                // and MessageForCreationDto to Message
                // Recipient information is coming from var recipient = await _repo.GetUser(messageForCreationDto.RecipientId);
                // even if we don't explicitly assigned it to the 'message' field
                // since AutoMapper magically got it from the memory.
                // We are placing this code nside the if statement so that we can get
                // the correct message id when returned
                var messageToReturn = _mapper.Map<MessageToReturnDto>(message);

                return CreatedAtRoute("GetMessage", new { id = message.Id }, messageToReturn);
            }                

            throw new Exception("Creating the message failed on save.");
        }

        // For deleting a message, we are adding an HttpPost instead of HttpDelete
        // because we are not actually deleting a message unless both sides of the
        // conversation have chosen to delete the message.  
        [HttpPost("{id}")] // id - is the message ID
        public async Task<IActionResult> DeleteMessage(int id, int userId)
        {
            // The first thing that we want to do is to check the user that is
            // attempting to update their profile matches the token that the
            // service is receiving. On the AuthController at line #77, we are
            // setting the ClaimTypes.NameIdentifier equal to the user identifier
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var messageFromRepo = await _repo.GetMessage(id);

            if (messageFromRepo == null)
                return BadRequest("Could not find message.");

            if (messageFromRepo.SenderId == userId)
                messageFromRepo.SenderDeleted = true;

            if (messageFromRepo.RecipientId == userId)
                messageFromRepo.RecipientDeleted = true;

            if (messageFromRepo.SenderDeleted && messageFromRepo.RecipientDeleted)
                _repo.Delete(messageFromRepo);

            if (await _repo.SaveAll())
                return NoContent();

            throw new Exception("Error deleting the message.");
        }

        [HttpPost("{id}/read")]
        public async Task<IActionResult> MarkMessageAsRead(int userId, int id)
        {
            // The first thing that we want to do is to check the user that is
            // attempting to update their profile matches the token that the
            // service is receiving. On the AuthController at line #77, we are
            // setting the ClaimTypes.NameIdentifier equal to the user identifier
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var message = await _repo.GetMessage(id);

            if (message.RecipientId != userId)
                return Unauthorized();

            message.IsRead = true;
            message.DateRead = DateTime.Now;

            await _repo.SaveAll();

            return NoContent();
        }
    }
}