using EducationManagement.Database.Models;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace EducationSystem.Dal.Abstraction
{
    public interface IUnitOfWork
    {
        UserManager<User> UserManager { get; }
        SignInManager<User> SignInManager { get; }
        RoleManager<Role> RoleManager { get; }
        Task<int> Save();

        ISubjectsRepository SubjectsRepository { get; }
        ILevelsRepository LevelsRepository { get; }
        ISubjectLevelsRepository SubjectLevelsRepository { get; }
    }
}
