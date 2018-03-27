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
        private UserService userService;
        public UsersController(UserService _userService)
        {
            userService = _userService;
        }

        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        [Route("getUser")]
        //TODO require admin
        public IActionResult GetUser(string id = null)
        {
            if(id != null)
            {
                var user = userService.GetUser(id);
                return Ok(user);
            }
            else
            {
                return Forbid("User not found!");
            }
        }

        [HttpGet]
        [Route("getUser/current")]
        //TODO require admin
        public async Task<IActionResult> GetUser()
        {
            var userId = User.Claims.FirstOrDefault(c => c.Type == JwtRegisteredClaimNames.Sid)?.Value;
            if (userId == null)
            {
                return Forbid("User not found!");
            }

            var userModel = userService.GetUser(userId);

            return Ok(userModel);
        }

        [HttpGet]
        [Route("getUsers")]
        [Authorize(Roles = nameof(Roles.Admin))]
        public async Task<IActionResult> GetUsers()
        {
            var userId = User.Claims.FirstOrDefault(c => c.Type == JwtRegisteredClaimNames.Sid)?.Value;
            //var userRole = User.Claims.LastOrDefault(c => c.Type == JwtRegisteredClaimNames.)?.Value;
            //if (userId == null || userRole != Roles.Admin.ToString())
            if (userId == null)
            {
                return Forbid("User not found!");
            }

            var usersList = userService.GetUsersList(userId);

            return Ok(usersList);
        }

        [HttpPost]
        [Route("edit")]
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
            var result = await userService.EditUser(model,false);

            return Ok(result);
        }

        [HttpPost]
        [Route("editUser")]
        [Authorize(Roles = nameof(Roles.Admin))]
        public async Task<IActionResult> EditUserByAdmin([FromBody]UserBindingModel model)
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
            var result = await userService.EditUser(model,true);
            return Ok(result);
        }

        [HttpPost]
        [Route("remove")]
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

            var result = userService.RemoveUser(id);

            return Ok(result);
        }
    }
}