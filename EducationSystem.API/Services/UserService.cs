using EducationManagement.Database.Models;
using EducationSystem.Dal.Abstraction;
using EducationSystem.Models.BindingModels;
using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EducationSystem.Api.Services
{
    public class UserService
    {
        private readonly IUnitOfWork _unitOfWork;

        public UserService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public UserBindingModel GetUser(string id)
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
            return user;
        }

        public bool UserExists(string id)
        {
            var user = _unitOfWork.UserManager.Users.FirstOrDefault(r => r.Id == id);
            return user != null;
        }

        public List<UserBindingModel> GetUsersList(string currentUserId)
        {
            var usersList = _unitOfWork.UserManager.Users
                .Where(u => u.Id != currentUserId).Select(u =>
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

            return usersList;
        }

        public async Task<IdentityResult> EditUser(UserBindingModel model, bool canEditRole)
        {
            var user = _unitOfWork.UserManager.Users.Where(r => r.Id == model.Id).FirstOrDefault();
            if(user != null)
            {
                user.FirstName = model.FirstName;
                user.MiddleName = model.MiddleName;
                user.LastName = model.LastName;
                user.DateOfBirth = model.DateOfBirth;
                user.PhoneNumber = model.PhoneNumber;
                user.ProfilePictureUrl = model.ProfilePictureUrl;

                if(canEditRole)
                   user.RoleId = model.RoleId;

                var result = await _unitOfWork.UserManager.UpdateAsync(user);

                return result;
            }
            return null;
        }

        public async Task<IdentityResult> RemoveUser(string id)
        {
            var userToRemove = _unitOfWork.UserManager.Users.FirstOrDefault(u => u.Id == id);
            var result = await _unitOfWork.UserManager.DeleteAsync(userToRemove);

            return result;
        }
    }
}
