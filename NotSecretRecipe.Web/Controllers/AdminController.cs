using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using NotSecretRecipe.Models;

namespace NotSecretRecipe.Web.Controllers
{
    public class AdminController : Controller
    {
        //
        // GET: /Admin/

        [HttpGet]
        public PartialViewResult NewRecipe()
        {
            var newRecipe = new Recipe();
            newRecipe.Directions = new List<Direction>();
            newRecipe.Directions.Add(new Direction() { Step = 0, Description = "desc1" });
            newRecipe.Directions.Add(new Direction() { Step = 1, Description = "desc2" });
            return PartialView(newRecipe);
        }

        [HttpPost]
        public int NewRecipe(Recipe newRecipe)
        {
            return 1;
        }


    }
}
