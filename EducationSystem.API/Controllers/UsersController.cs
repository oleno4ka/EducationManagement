using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Threading.Tasks;
using EducationManagement.Database.Models.Enums;
using EducationSystem.Api.Services;
using EducationSystem.Models.BindingModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EducationSystem.Api.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    //TODO: require role
    public class UsersController : Controller
    {
        private readonly UserService _userService;
        public UsersController(UserService userService)
        {
            _userService = userService;
        }

        [HttpGet]
        [Route("{id}")]
        //TODO require admin
        public IActionResult GetUser(string id = null)
        {
            if(id != null)
            {
                var user = _userService.GetUser(id);
                return Ok(user);
            }
            else
            {
                return Forbid("User not found!");
            }
        }

        [HttpGet]
        [Route("current")]
        //TODO require admin
        public async Task<IActionResult> GetUser()
        {
            var userId = User.Claims.FirstOrDefault(c => c.Type == JwtRegisteredClaimNames.Sid)?.Value;
            if (userId == null)
            {
                return Forbid("User not found!");
            }

            var userModel = _userService.GetUser(userId);

            return Ok(userModel);
        }

        [HttpGet]
        [Authorize(Roles = nameof(Roles.Admin))]
        public async Task<IActionResult> Get()
        {
            var userId = User.Claims.FirstOrDefault(c => c.Type == JwtRegisteredClaimNames.Sid)?.Value;
            //var userRole = User.Claims.LastOrDefault(c => c.Type == JwtRegisteredClaimNames.)?.Value;
            //if (userId == null || userRole != Roles.Admin.ToString())
            if (userId == null)
            {
                return Forbid("User not found!");
            }

            var usersList = _userService.GetUsersList(userId);

            return Ok(usersList);
        }

        [HttpPatch]
        [Route("current")]
        public async Task<IActionResult> EditCurrentUser([FromBody]UserBindingModel model)
        {
            var userId = User.Claims.FirstOrDefault(c => c.Type == JwtRegisteredClaimNames.Sid)?.Value;

            if (userId == null || model.Id != userId)
            {
                return Forbid("User not found!");
            }
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var result = await _userService.EditUser(model,false);

            return Ok(result);
        }

        [HttpPatch]
        [Route("{id}")]
        [Authorize(Roles = nameof(Roles.Admin))]
        public async Task<IActionResult> EditUserByAdmin(string id,[FromBody]UserBindingModel model)
        {
            var userId = User.Claims.FirstOrDefault(c => c.Type == JwtRegisteredClaimNames.Sid)?.Value; 
            if (userId == null || model.Id == userId)
            {
                return Forbid("User not found!");
            }
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var result = await _userService.EditUser(model,true);
            return Ok(result);
        }

        [HttpDelete]
        [Route("{id}")]
        [Authorize(Roles = nameof(Roles.Admin))]
        public async Task<IActionResult> RemoveUser(string id)
        {
            var userId = User.Claims.FirstOrDefault(c => c.Type == JwtRegisteredClaimNames.Sid)?.Value; 
            if (userId == null  || id == userId)
            {
                return Forbid("User not found or have not permissions!");
            }
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = _userService.RemoveUser(id);

            return Ok(result);
        }
    }
}