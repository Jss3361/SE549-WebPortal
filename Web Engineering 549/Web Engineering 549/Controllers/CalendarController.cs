using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Web_Engineering_549.Models;
using Web_Engineering_549.Services;

namespace Web_Engineering_549.Controllers
{
    public class CalendarController : Controller
    {
        CalendarService calendarService = new CalendarService();

        public ActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public ActionResult Calendar()
        {
            return View();
        }

        [HttpPost]
        public ActionResult SaveEvent(String event_title, DateTime event_start_date)
        {
            var calendar_event = new CalendarEvent()
            {
                title = event_title,
                start_date = event_start_date
            };

            calendarService.SaveEvent(calendar_event);

            return new EmptyResult();
        }

    }
}
