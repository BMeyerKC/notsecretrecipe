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

        [HttpPost]
        public int NewRecipe(Recipe newRecipe, FormCollection form)
        {
            var returnId = newRecipe.Id;

            using (var raven = MvcApplication.Store.OpenSession())
            {
                var oldRecipe = raven.Load<Recipe>(string.Format("recipes/{0}", newRecipe.Id));
                if (oldRecipe != null && TryUpdateModel(oldRecipe))
                {
                    raven.Store(oldRecipe, oldRecipe.Id.ToString());
                    returnId = oldRecipe.Id;
                }
                else
                {
                    newRecipe.CreateDate = DateTime.Now;
                    raven.Store(newRecipe);
                }
                raven.SaveChanges();
            }

            return returnId;
        }


    }
}
