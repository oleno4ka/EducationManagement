using EducationManagement.Database.Models;
using EducationSystem.Dal.Abstraction;

namespace EducationSystem.Dal.Concreteness
{
    public class SubjectLevelsRepository : GenericRepository<SubjectLevel>, ISubjectLevelsRepository
    {
        public SubjectLevelsRepository(EducationManagementContext context) : base(context) { }
    }
}
