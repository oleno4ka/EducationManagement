﻿using System.Threading.Tasks;
using EducationSystem.Api.Services;
using EducationSystem.Models.BindingModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EducationSystem.Api.Controllers
{
    [Route("api/[controller]")]
    [AllowAnonymous]
    public class AccountController : Controller
    {
        private AuthenticationService authenticationService;
        private UserService userService;
        private EnumService enumService;

        public AccountController(AuthenticationService _authenticationService,
            UserService _userService,
            EnumService _enumService)
        {
            authenticationService = _authenticationService;
            userService = _userService;
            enumService = _enumService;
        }

        // POST api/account/login
        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login([FromBody]LoginBindingModel model)
        {
            if (!ModelState.IsValid) { return BadRequest(ModelState); }

            var token = await authenticationService.Login(model);

            if (token == null)
            {
                ModelState.AddModelError("Email", "api_account_errors.user_notfound");
            }

            return Ok(new { token = token});
        }

        // PUT api/register
        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register([FromBody]RegisterBindingModel model)
        {
            if (!ModelState.IsValid) { return BadRequest("Could not create token"); }

            if (userService.UserExists(model.Email))
            {
                ModelState.AddModelError("Email", "api_account_arror.user_alreadyexist");
            }

            var token = authenticationService.Register(model);

            if (token == null)
            {
                return BadRequest(ModelState);
            }

            return Ok(new { token = token });
        }

        [HttpGet]
        [Route("roles")]
        public IActionResult GetRoles()
        {
            var roles = enumService.GetRoles();
            return Ok(new { roles });
        }
    }
}