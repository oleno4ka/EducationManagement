﻿
namespace EducationManagement.Database.Models
{
    //not implemented for now
    public class Permission
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int RoleId { get; set; }

        public Role Role { get; set; }
    }
}
