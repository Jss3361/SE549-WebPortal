using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Web_Engineering_549.Controllers
{
    public class FacebookController : Controller
    {
        //
        // GET: /Facebook/

        public ActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public ActionResult Facebook()
        {
            return View();
        }

    }
}
