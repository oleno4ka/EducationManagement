using EducationManagement.Database.Models;
using EducationSystem.Dal.Abstraction;

namespace EducationSystem.Dal.Concreteness
{
    public class LevelsRepository : GenericRepository<Level>, ILevelsRepository
    {
        public LevelsRepository(EducationManagementContext context) : base(context) { }
    }
}
