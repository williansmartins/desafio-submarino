using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SubViagens.Controllers
{
    public class PackagesController : Controller
    {

        //
        // GET: /Packages/

        public ActionResult Index()
        {
            return View();
        }

        //
        // GET: /Packages/HotelSearchResult

        public ActionResult HotelSearchResult()
        {
            return View();
        }
        //
        //
        // GET: /Packages/FlightSearchResult

        public ActionResult FlightSearchResult()
        {
            return View();
        }
        //
        // GET: /Packages/Detail

        public ActionResult Detail()
        {
            return View();
        }
        //
        // GET: /Packages/Booking

        public ActionResult Booking()
        {
            return View();
        }
        //
        // GET: /Packages/Confirmation

        public ActionResult Confirmation()
        {
            return View();
        }

    }
}
