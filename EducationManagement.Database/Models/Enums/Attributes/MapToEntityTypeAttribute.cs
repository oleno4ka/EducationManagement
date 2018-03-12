using System;

namespace EducationManagement.Database.Models.Enums.Attributes
{
    [AttributeUsage(AttributeTargets.Enum, AllowMultiple = false)]
    public class MapToEntityTypeAttribute : Attribute
    {
        public Type Type { get; }

        public MapToEntityTypeAttribute(Type type)
        {
            Type = type;
        }
    }
}
