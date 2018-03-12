using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using EducationManagement.Database.Models;
using EducationManagement.Database.Models.Enums;
using EducationSystem.Dal.Abstraction;
using EducationSystem.Models.BindingModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace EducationSystem.Api.Controllers
{
    [Route("api/[controller]")]
    [AllowAnonymous]
    public class AccountController : Controller
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IOptions<JWTOptions> _options;

        public AccountController(IUnitOfWork unitOfWork
            , IOptions<JWTOptions> options)
        {
            _unitOfWork = unitOfWork;
            _options = options;
        }

        public IActionResult Index()
        {
            return View();
        }

        // POST api/account/login
        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login([FromBody]LoginBindingModel model)
        {
            if (model.Password != model.ConfirmPassword)
            {
                ModelState.AddModelError("Password", "register_error.passwordconfirmation_invalid");
            }
            if (!ModelState.IsValid) { return BadRequest(ModelState); }
            var user = await _unitOfWork.UserManager.FindByEmailAsync(model.Email);
            if (user == null)
            {
                ModelState.AddModelError("Email", "api_account_errors.user_notfound");
            }
            else
            {
                var roles = await _unitOfWork.UserManager.GetRolesAsync(user);
                var result = await _unitOfWork.SignInManager.CheckPasswordSignInAsync(user, model.Password, false);
                if (!result.Succeeded) return BadRequest(ModelState);
                var claims = new List<Claim> {
                    new Claim( ClaimsIdentity.DefaultNameClaimType, user.Email ),
                    new Claim( JwtRegisteredClaimNames.Sub, user.Email ),
                    new Claim( JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString() ),
                    new Claim( JwtRegisteredClaimNames.Sid, user.Id.ToString() ) // Set userid to token Sid claim
                };
                if (roles.Any())
                {
                    claims.AddRange(roles.Select(role => new Claim(JwtRegisteredClaimNames.Sub, role)));
                }
                var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_options.Value.Key));
                var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

                var token = new JwtSecurityToken(
                    issuer: _options.Value.Issuer,
                    audience: _options.Value.Issuer,
                    claims: claims,
                    expires: DateTime.UtcNow.AddMinutes(30),
                    signingCredentials: creds);

                return Ok(new { token = new JwtSecurityTokenHandler().WriteToken(token), id = user.Id });
            }

            return BadRequest(ModelState);
        }

        // PUT api/values/5
        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register([FromBody]RegisterBindingModel model)
        {
            if(model.Password != model.ConfirmPassword)
            {
                ModelState.AddModelError("Password", "register_error.passwordconfirmation_invalid");
            }
            if (!ModelState.IsValid) { return BadRequest("Could not create token"); }
            if (await _unitOfWork.UserManager.FindByNameAsync(model.Email) != null)
            {
                ModelState.AddModelError("Email", "api_account_arror.user_alreadyexist");
            }
            else
            {
                var user = new Admin {
                    Email = model.Email,
                    UserName = model.Email,
                    LastName = model.LastName,
                    FirstName = model.FirstName,
                    MiddleName = model.MiddleName,
                    DateOfBirth = model.DateOfBirth,
                    PhoneNumber = model.PhoneNumber,
                    DateRegistered = DateTime.Now,
                    RoleId = ((int)Roles.Admin).ToString()
                };
                try
                {
                    var result = await _unitOfWork.UserManager.CreateAsync(user, model.Password);
                    if (!result.Succeeded) { return BadRequest("Could not create token"); }
                
               
                
                var claims = new[]
                {
                    new Claim(ClaimsIdentity.DefaultNameClaimType,user.Email),
                    new Claim(JwtRegisteredClaimNames.Sub, user.Email),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                    new Claim(JwtRegisteredClaimNames.Sid, user.Id.ToString()) // Set userid to token Sid claim
                };

                var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_options.Value.Key));
                var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

                var token = new JwtSecurityToken(_options.Value.Issuer,
                    _options.Value.Issuer,
                    claims,
                    expires: DateTime.Now.AddMinutes(30),
                    signingCredentials: creds);

                return Ok(new { token = new JwtSecurityTokenHandler().WriteToken(token), id = user.Id });
                }
                catch (Exception e)
                {
                    return BadRequest("Error: "+e.Message + " inner:"+ e.InnerException?.Message);
                }
            }

            return BadRequest("Could not create token");
        }
    }
}