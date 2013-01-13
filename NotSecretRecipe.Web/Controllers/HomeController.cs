using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Raven.Client;
using Raven.Client.Document;

namespace NotSecretRecipe.Web.Controllers
{
    public class HomeController : RavenController
    {
        private readonly IDocumentSession _session;

        public ActionResult Index()
        {
            var cats = RavenSession.Query<Category>().ToList();
            
            return View();
        }

    }

    public class Category
    {
        public string Name { get; set; }
        public string Description { get; set; }
    }
}
