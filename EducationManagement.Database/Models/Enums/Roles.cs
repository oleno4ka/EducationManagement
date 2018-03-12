using EducationManagement.Database.Models.Enums.Attributes;

namespace EducationManagement.Database.Models.Enums
{
    [MapToEntityType(typeof(Role))]
    public enum Roles
    {
        [MappedEntityProperty(nameof(Role.Name), "Admin")]
        [MappedEntityProperty(nameof(Role.IsManageable), true)]
        Admin = 1,

        [MappedEntityProperty(nameof(Role.Name), "Teacher")]
        [MappedEntityProperty(nameof(Role.IsManageable), true)]
        Teacher = 2,

        [MappedEntityProperty(nameof(Role.Name), "Student")]
        [MappedEntityProperty(nameof(Role.IsManageable), true)]
        Student = 3,
    }
}
