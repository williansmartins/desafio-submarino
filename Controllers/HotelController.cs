using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SubViagens.Controllers
{
    public class HotelController : Controller
    {
        //
        // GET: /Hotel/

        public ActionResult Index()
        {
            return View();
        }
        //
        // GET: /Hotel/SearchResult

        public ActionResult SearchResult()
        {
            return View();
        }
        //
        // GET: /Hotel/Detail

        public ActionResult Detail()
        {
            return View();
        }
        //
        // GET: /Hotel/Booking

        public ActionResult Booking()
        {
            return View();
        }
        //
        // GET: /Hotel/Confirmation

        public ActionResult Confirmation()
        {
            return View();
        }

    }
}
