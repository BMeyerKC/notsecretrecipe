using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using NotSecretRecipe.Models;
using Raven.Client.Document;

namespace NotSecretRecipe.Web.Controllers
{
    public class ServiceController : RavenController
    {
        //
        // GET: /Service/

        public JsonResult Categories()
        {
            List<Category> cats;
            using (var raven = MvcApplication.Store.OpenSession())
            {
                cats = raven.Query<Category>().ToList();
            }

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
    }

}
