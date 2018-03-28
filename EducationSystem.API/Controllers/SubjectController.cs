
using EducationManagement.Database.Models.Enums;
using EducationSystem.Api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EducationSystem.Api.Controllers
{
    [Route("api/[controller]")]
    [Authorize(Roles = nameof(Roles.Admin))]
    public class SubjectController : Controller
    {
        private SubjectLevelService subjectLevelService;

        public SubjectController(SubjectLevelService _subjectLevelService)
        {
            subjectLevelService = _subjectLevelService;
        }

        [HttpGet]
        [Route("getSubjects")]
        //TODO require admin
        public IActionResult GetSubjects()
        {
            var result = subjectLevelService.GetSubjects();
            if(result != null)
                return Ok(result);
            else
                return BadRequest(ModelState);
        }
    }
}