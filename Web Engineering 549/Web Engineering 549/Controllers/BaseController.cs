using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Web_Engineering_549.Controllers
{
    public class BaseController : Controller
    {

        public Guid GetSession()
        {
            var sessionCookie = Request.Cookies["SESSION_ID"];
            if (sessionCookie != null)
            {
                return new Guid(sessionCookie.Value);
            }

            return Guid.Empty;
        }

    }
}
