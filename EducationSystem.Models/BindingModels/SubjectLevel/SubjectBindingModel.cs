
using System.Collections.Generic;

namespace EducationSystem.Models.BindingModels
{
    public class SubjectBindingModel
    {
        public SubjectBindingModel()
        {
            SubjectLevels = new List<SubjectLevelBindingModel>();
        }

        public int Id { get; set; }
        public string Name { get; set; }

        public ICollection<SubjectLevelBindingModel> SubjectLevels { get; set; }
    }
}
