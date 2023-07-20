using System;
using Microsoft.AspNetCore.Mvc;
using Menagerie.Repositories;
using Menagerie.Models;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace Menagerie.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserProfileController : ControllerBase
    {
        private readonly IUserProfileRepository _userProfileRepository;
        public UserProfileController(IUserProfileRepository userProfileRepository)
        {
            _userProfileRepository = userProfileRepository;
        }
        [Authorize]
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_userProfileRepository.GetAll());
        }

        [Authorize]
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var userProfile = _userProfileRepository.GetById(id);
            if (userProfile == null)
            {
                return NotFound();
            }
            return Ok(userProfile);
        }
        [Authorize]
        [HttpGet("Authenticate/{firebaseId}")]
        public IActionResult GetByFirebaseId(string fireBaseId)
        {
            var userProfile = _userProfileRepository.GetByFirebaseId(fireBaseId);
            if (userProfile == null)
            {
                return NotFound();
            }
            return Ok(userProfile);
        }
        [HttpGet("DoesUserExist/{firebaseUserId}")]
        public IActionResult DoesUserExist(string firebaseUserId)
        {
            var userProfile = _userProfileRepository.GetByFirebaseId(firebaseUserId);
            if (userProfile == null)
            {
                return NotFound();
            }
            return Ok();
        }       
        [Authorize]
        [HttpPost]
        public IActionResult Post(UserProfile userProfile)
        {
            _userProfileRepository.Add(userProfile);
            return CreatedAtAction("Get", new { id = userProfile.Id }, userProfile);
        }
        [Authorize]
        [HttpPut("{id}")]
        public IActionResult Put(int id, UserProfile userProfile)
        {
            if (id != userProfile.Id)
            {
                return BadRequest();
            }

            _userProfileRepository.Update(userProfile);
            return NoContent();
        }
        [Authorize]
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _userProfileRepository.Delete(id);
            return NoContent();
        }

        [HttpGet("Me")]
        public IActionResult Me()
        {
            var userProfile = GetCurrentUserProfile();
            if (userProfile == null)
            {
                return NotFound();
            }

            return Ok(userProfile);
        }
        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseId(firebaseUserId);
        }
    }
}