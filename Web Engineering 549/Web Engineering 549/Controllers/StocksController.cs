using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Web_Engineering_549.Controllers
{
    public class StocksController : Controller
    {
        //
        // GET: /Stocks/

        public ActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public ActionResult Stocks()
        {
            return View();
        }

    }
}
