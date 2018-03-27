using EducationManagement.Database.Models;
using EducationManagement.Database.Models.Enums;
using EducationSystem.Dal.Abstraction;
using EducationSystem.Models.BindingModels;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace EducationSystem.Api.Services
{
    public class AuthenticationService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IOptions<JWTOptions> _options;

        public AuthenticationService(IUnitOfWork unitOfWork, IOptions<JWTOptions> options)
        {
            _unitOfWork = unitOfWork;
            _options = options;
        }

        public async Task<string> Login(LoginBindingModel model)
        {
            var user = await _unitOfWork.UserManager.FindByEmailAsync(model.Email);
            var roles = _unitOfWork.RoleManager.Roles;
            if (user == null)
            {
                return null;
            }

            var result = await _unitOfWork.SignInManager.CheckPasswordSignInAsync(user, model.Password, false);
            if (!result.Succeeded) return null;
            var claims = new List<Claim> {
                    new Claim( JwtRegisteredClaimNames.Sub, user.Email ),
                    new Claim( JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString() ),
                    new Claim( JwtRegisteredClaimNames.Sid, user.Id.ToString() ) // Set userid to token Sid claim
                };
            if (roles.Any())
            {
                var userRole = roles.FirstOrDefault(r => r.Id == user.RoleId);
                claims.Add(new Claim(Constants.RoleClaimType, userRole.Name));
            }
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_options.Value.Key));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _options.Value.Issuer,
                audience: _options.Value.Issuer,
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(30),
                signingCredentials: creds);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public async Task<string> Register(RegisterBindingModel model)
        {

            User user;
            if (Convert.ToInt32(model.RoleId) == (int)Roles.Student)
            {
                user = new Student
                {
                    Email = model.Email,
                    UserName = model.Email,
                    LastName = model.LastName,
                    FirstName = model.FirstName,
                    MiddleName = model.MiddleName,
                    DateOfBirth = model.DateOfBirth,
                    PhoneNumber = model.PhoneNumber,
                    DateRegistered = DateTime.Now,
                    RoleId = model.RoleId
                };
            }
            else
            {
                user = new Teacher
                {
                    Email = model.Email,
                    UserName = model.Email,
                    LastName = model.LastName,
                    FirstName = model.FirstName,
                    MiddleName = model.MiddleName,
                    DateOfBirth = model.DateOfBirth,
                    PhoneNumber = model.PhoneNumber,
                    DateRegistered = DateTime.Now,
                    RoleId = model.RoleId
                };
            }

            var result = await _unitOfWork.UserManager.CreateAsync(user, model.Password);
            if (!result.Succeeded) { return null; }

            var claims = new List<Claim>
            {
                    new Claim(JwtRegisteredClaimNames.Sub, user.Email),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                    new Claim(JwtRegisteredClaimNames.Sid, user.Id.ToString())
                };
            var roles = _unitOfWork.RoleManager.Roles;
            if (roles.Any())
            {
                var userRole = roles.FirstOrDefault(r => r.Id == user.RoleId);
                claims.Add(new Claim(Constants.RoleClaimType, userRole.Name));
            }
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_options.Value.Key));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(_options.Value.Issuer,
                _options.Value.Issuer,
                claims,
                expires: DateTime.Now.AddMinutes(30),
                signingCredentials: creds);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
