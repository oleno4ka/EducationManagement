using System;

namespace EducationManagement.Database.Models.Enums.Attributes
{
    [AttributeUsage(AttributeTargets.Field, AllowMultiple = true)]
    public class MappedEntityPropertyAttribute : Attribute
    {
        public string PropertyName { get; }
        public object PropertyValue { get; }

        public MappedEntityPropertyAttribute(string propertyName, object propertyValue)
        {
            PropertyName = propertyName;
            PropertyValue = propertyValue;
        }
    }
}
