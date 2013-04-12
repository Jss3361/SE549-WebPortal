using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;
using Web_Engineering_549.Services;

namespace Web_Engineering_549.ControllerAttributes
{
    public class AuthenticateAttribute : ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            var sessionCookie = filterContext.HttpContext.Request.Cookies["SESSION_ID"];
            if (sessionCookie != null)
            {
                var accountService = new AccountService();
                var sessionId = new Guid(sessionCookie.Value);
                if (accountService.ValidateSession(sessionId))
                {
                    return;
                }
            }

            filterContext.Result = new RedirectToRouteResult(
                new RouteValueDictionary { { "controller", "Account" }, { "action", "Login" } });
        }
    }
}