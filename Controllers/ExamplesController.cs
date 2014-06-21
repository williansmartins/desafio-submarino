using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SubViagens.Controllers
{
    public class ExamplesController : Controller
    {
        //
        // GET: /Examples/

        public ActionResult Index()
        {
            return View();
        }
        //
        // GET: /Examples/form

        public ActionResult Form()
        {
            return View();
        }
        //
        // GET: /Examples/Tooltips

        public ActionResult Tooltips()
        {
            return View();
        }

    }
}
