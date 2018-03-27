
using EducationSystem.Dal.Abstraction;
using EducationSystem.Models.BindingModels;
using System.Collections.Generic;
using System.Linq;

namespace EducationSystem.Api.Services
{
    public class EnumService
    {
        private readonly IUnitOfWork _unitOfWork;

        public EnumService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        public List<RoleBindingModel> GetRoles()
        {
            var roles = _unitOfWork.RoleManager.Roles.Where(r => r.IsManageable)
                .Select(r => new RoleBindingModel()
            {
                Id = r.Id,
                Name = r.Name
            }).ToList();

            return roles;
        }
    }
}
