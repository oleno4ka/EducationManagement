
namespace EducationSystem.Models.BindingModels
{
    public class SubjectLevelBindingModel
    {
        public int SubjectId { get; set; }
        public int LevelId { get; set; }
        public int? EntryTaskIdId { get; set; }

        public string SubjectName { get; set; }
        public string LevelName { get; set; }

        public string Price { get; set; }

        public string Name
        {
            get { return this.SubjectName + " " + this.LevelName; }
        }
    }
}
