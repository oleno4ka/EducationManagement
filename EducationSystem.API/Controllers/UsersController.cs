using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Mvc;

namespace EducationSystem.Api.Controllers
{
    [Route("api/[controller]")]
    public class UsersController : Controller
    {
        public UsersController()
        {
        }

        public IActionResult Index()
        {
            return View();
        }
    }
}