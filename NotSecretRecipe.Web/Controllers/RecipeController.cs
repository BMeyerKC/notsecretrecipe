using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using NotSecretRecipe.Models;

namespace NotSecretRecipe.Web.Controllers
{
    public class RecipeController : RavenController
    {

        public class RecipeVM
        {
            public Recipe recipe;
        }

        //
        // GET: /Recipe/

        public ActionResult Index(int id = 0)
        {
            var recipeVM = new RecipeVM {recipe = RavenSession.Load<Recipe>(string.Format("recipes/{0}", id))};
            return View(recipeVM);
        }

    }
}
