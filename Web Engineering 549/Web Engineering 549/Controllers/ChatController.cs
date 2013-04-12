using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using PusherServer;

namespace Web_Engineering_549.Controllers
{
    public class ChatController : Controller
    {
        //
        // GET: /Chat/

        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public ActionResult SendMessage(String message)
        {

            var pusher = new Pusher("41501", "fe769be86f1e807ab53c", "c6cb978e7721fbd3b6cd");
            var result = pusher.Trigger("test_channel", "test_event", new { message });

            return new EmptyResult();
        }

    }
}
