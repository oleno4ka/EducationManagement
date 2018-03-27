using EducationManagement.Database.Models;
using EducationSystem.Dal.Abstraction;

namespace EducationSystem.Dal.Concreteness
{
    public class SubjectsRepository : GenericRepository<Subject>, ISubjectsRepository
    {
        public SubjectsRepository(EducationManagementContext context) : base(context) { }
    }
}
