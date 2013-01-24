using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using NotSecretRecipe.Models;

namespace NotSecretRecipe.Web.Controllers
{
    public class ServiceController : RavenController
    {
        //
        // GET: /Service/

        public JsonResult Categories()
        {
            var cats = new List<Category>();
            List<Recipe> recipes;
            using (var raven = MvcApplication.Store.OpenSession())
            {
                recipes = raven.Query<Recipe>().ToList();
            }

            recipes.ForEach(r =>
                {
                    if (r.Category != null) cats.Add(r.Category);
                });

            cats.ForEach(c =>
                {
                    c.Name = c.Name ?? "";
                });
            return Json(cats);
        }

        public JsonResult WelcomeMessage()
        {
            WebContent webContent;
            using (var raven = MvcApplication.Store.OpenSession())
            {
                webContent = raven.Load<WebContent>("webcontent/1");
            }

            return Json(webContent);
        }

        public JsonResult Recipes()
        {
            List<Recipe> recipes;
            using (var raven = MvcApplication.Store.OpenSession())
            {
                recipes = raven.Query<Recipe>().ToList();
            }
            return Json(recipes);
        }

        public JsonResult Recipe(int id)
        {
            var recipe = new Recipe();

            if (id == 0)
            {
                return Json(recipe);
            }

            using (var raven = MvcApplication.Store.OpenSession())
            {
                recipe = raven.Load<Recipe>(string.Format("recipes/{0}", id));
            }

            return Json(recipe);
        }

    }

}
