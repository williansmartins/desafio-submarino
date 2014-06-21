using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SubViagens.Controllers
{
    public class MultiDestinationController : Controller
    {
        //
        // GET: /MultiDestination/

        public ActionResult Index()
        {
            return View();
        }
        //
        // GET: /MultiDestination/SearchResult

        public ActionResult SearchResult()
        {
            return View();
        }

        //
        // GET: /MultiDestination/Booking

        public ActionResult Booking()
        {
            return View();
        }

        //
        // GET: /MultiDestination/Confirmation

        public ActionResult Confirmation()
        {
            return View();
        }

    }
}
