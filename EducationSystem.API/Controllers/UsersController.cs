using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Threading.Tasks;
using EducationManagement.Database.Models.Enums;
using EducationSystem.Dal.Abstraction;
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
        private readonly IUnitOfWork _unitOfWork;

        public UsersController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
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
            var user = _unitOfWork.UserManager.Users.Where(r => r.Id == id).Select(r => new UserBindingModel()
            {
                Id = r.Id,
                FirstName = r.FirstName,
                MiddleName = r.MiddleName,
                LastName = r.LastName,
                DateOfBirth = r.DateOfBirth,
                Email = r.Email,
                PhoneNumber = r.PhoneNumber,
                ProfilePictureUrl = r.ProfilePictureUrl,
                RoleId = r.RoleId,
                DateRegistered = r.DateRegistered
            })
            .FirstOrDefault();
            return Ok(user);
        }

        [HttpGet]
        [Route("getUser/current")]
        //TODO require admin
        public async Task<IActionResult> GetUser()
        {
            var userId = User.Claims.FirstOrDefault(c => c.Type == JwtRegisteredClaimNames.Sid)?.Value; // Get user id from token Sid claim
            var user = await _unitOfWork.UserManager.FindByIdAsync(userId);
            if (user == null)
            {
                return Forbid("User not found!");
            }

            var userModel = new UserBindingModel()
            {
                Id = user.Id,
                FirstName = user.FirstName,
                MiddleName = user.MiddleName,
                LastName = user.LastName,
                DateOfBirth = user.DateOfBirth,
                Email = user.Email,
                PhoneNumber = user.PhoneNumber,
                ProfilePictureUrl = user.ProfilePictureUrl,
                RoleId = user.RoleId,
                DateRegistered = user.DateRegistered
            };

            return Ok(userModel);
        }

        [HttpGet]
        [Route("getUsers")]
        //TODO require admin
        public async Task<IActionResult> GetUsers()
        {
            var userId = User.Claims.FirstOrDefault(c => c.Type == JwtRegisteredClaimNames.Sid)?.Value; // Get user id from token Sid claim
            var user = await _unitOfWork.UserManager.FindByIdAsync(userId);
            if (user == null && Convert.ToInt16(user.RoleId) != (int)Roles.Admin)
            {
                return Forbid("User not found!");
            }

            var usersList = _unitOfWork.UserManager.Users
                .Where(u => u.Id != user.Id).Select(u =>
            new UserBindingModel()
            {
                Id = u.Id,
                FirstName = u.FirstName,
                MiddleName = u.MiddleName,
                LastName = u.LastName,
                DateOfBirth = u.DateOfBirth,
                Email = u.Email,
                PhoneNumber = u.PhoneNumber,
                ProfilePictureUrl = u.ProfilePictureUrl,
                RoleId = u.RoleId,
                DateRegistered = u.DateRegistered
            }).ToList();

            return Ok(usersList);
        }

        [HttpPost]
        [Route("edit")]
        //TODO require admin
        public async Task<IActionResult> EditUser([FromBody]UserBindingModel model)
        {
            var userId = User.Claims.FirstOrDefault(c => c.Type == JwtRegisteredClaimNames.Sid)?.Value; // Get user id from token Sid claim
            var user = await _unitOfWork.UserManager.FindByIdAsync(userId);
            if (user == null && Convert.ToInt16(user.RoleId) != (int)Roles.Admin)
            {
                return Forbid("User not found!");
            }
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            user.FirstName = model.FirstName;
            user.MiddleName = model.MiddleName;
            user.LastName = model.LastName;
            user.DateOfBirth = model.DateOfBirth;
            user.PhoneNumber = model.PhoneNumber;
            user.ProfilePictureUrl = model.ProfilePictureUrl;

            var result = await _unitOfWork.UserManager.UpdateAsync(user);
            return Ok(result);
        }

        [HttpPost]
        [Route("remove")]
        //TODO require admin
        public async Task<IActionResult> RemoveUser(string id)
        {
            var userId = User.Claims.FirstOrDefault(c => c.Type == JwtRegisteredClaimNames.Sid)?.Value; // Get user id from token Sid claim
            var userCurrent = await _unitOfWork.UserManager.FindByIdAsync(userId);
            if (userCurrent == null && Convert.ToInt16(userCurrent.RoleId) != (int)Roles.Admin)
            {
                return Forbid("User not found or have not permissions!");
            }
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var userToRemove = _unitOfWork.UserManager.Users.FirstOrDefault(u => u.Id == id);
            var result = await _unitOfWork.UserManager.DeleteAsync(userToRemove);

            return Ok(result);
        }
    }
}