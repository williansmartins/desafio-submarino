using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SubViagens.Controllers
{
    public class FlightController : Controller
    {
        //
        // GET: /Flight/

        public ActionResult Index()
        {
            return View();
        }

        //
        // GET: /Flight/SearchResult

        public ActionResult SearchResult()
        {
            return View();
        }

        //
        // GET: /Flight/Booking

        public ActionResult Booking()
        {
            return View();
        }
        //
        // GET: /Flight/Confirmation

        public ActionResult Confirmation()
        {
            return View();
        }
    }
}
