using EducationManagement.Database.Models;
using EducationSystem.Dal.Abstraction;

namespace EducationSystem.Dal.Concreteness
{
    public class UsersRepository : GenericRepository<User>, IUsersRepository
    {
        public UsersRepository(EducationManagementContext context) : base(context) { }
    }
}
