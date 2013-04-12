using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Web_Engineering_549.Models;
using Web_Engineering_549.ControllerAttributes;
using Web_Engineering_549.Services;
using System.Net;

namespace Web_Engineering_549.Controllers
{
    public class AccountController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public ActionResult Login()
        {
            var sessionCookie = Request.Cookies["SESSION_ID"];
            if (sessionCookie != null)
            {
                var sessionService = new SessionService();
                var sessionId = new Guid(sessionCookie.Value);
                if (sessionService.ValidateSession(sessionId))
                {
                    return RedirectToAction("Index");
                }
                
            }

            return View();
        }

        [HttpPost]
        public JsonResult Logout()
        {
            var redirectURI = Url.Action("Index");

            if (Request.Cookies["SESSION_ID"] != null)
            {
                var c = new HttpCookie("SESSION_ID");
                c.Expires = DateTime.Now.AddDays(-1);
                Response.Cookies.Add(c);
                return Json(new { redirect = redirectURI });
            }

            return Json(new { redirect = redirectURI });
        }

        [HttpPost]
        public ActionResult Login(Account account)
        {
            var sessionID = Guid.NewGuid();
            var sessionExpiresAt = DateTime.Now.AddHours(5);
            account.sessionID = sessionID;
            account.sessionExpiresAt = sessionExpiresAt;

            var accountService = new AccountService();
            if (accountService.Login(account))
            {
                var sessionCookie = new HttpCookie("SESSION_ID")
                {
                    Value = sessionID.ToString(),
                    Expires = sessionExpiresAt
                };

                Response.Cookies.Add(sessionCookie);
                var redirectURI = Url.Action("Index");
                return Json(new { redirect = redirectURI });
            }

            return new HttpStatusCodeResult((int)HttpStatusCode.InternalServerError); 
        }

    }
}
