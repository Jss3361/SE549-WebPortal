using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Web_Engineering_549.Models;
using Web_Engineering_549.Services;
using Web_Engineering_549.ControllerAttributes;

namespace Web_Engineering_549.Controllers
{
    public class CalendarController : BaseController
    {
        CalendarService calendarService = new CalendarService();
        AccountService accountservice = new AccountService();

        [Authenticate]
        public ActionResult Index()
        {
            return View();
        }

        [Authenticate]
        [HttpGet]
        public ActionResult Calendar()
        {
            return View();
        }

        [Authenticate]
        [HttpPost]
        public JsonResult SaveEvent(String event_title, DateTime event_start_time, DateTime event_start_date, String event_description, String event_location)
        {
            var calendar_event = new CalendarEvent()
            {
                title = event_title,
                start_date = event_start_date.Add(event_start_time.AddHours(-1).TimeOfDay),
                user_id = accountservice.getUserID(base.GetSession()),
                description = event_description,
                location = event_location
            };

            var _event = calendarService.SaveEvent(calendar_event);

            return Json(new { _event });
        }

        [Authenticate]
        [HttpGet]
        public JsonResult GetEvents(long start, long end)
        {
            DateTime _start = new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc);
            DateTime startDate = _start.AddMilliseconds(start).ToLocalTime();
            DateTime __start = new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc);
            DateTime endDate = __start.AddMilliseconds(end).ToLocalTime();
            var events = calendarService.getEvents(
                accountservice.getUserID(base.GetSession()), startDate, endDate);
            return Json(new { events }, JsonRequestBehavior.AllowGet);
        }

        [Authenticate]
        [HttpGet]
        public JsonResult GetTopEvents()
        {
            var events = calendarService.getTopEvents(
                accountservice.getUserID(base.GetSession()));
            return Json(new { events }, JsonRequestBehavior.AllowGet);
        }

        [Authenticate]
        [HttpPost]
        public ActionResult deleteEvent(int id)
        {
            calendarService.deleteEvent(id, accountservice.getUserID(base.GetSession()));

            return RedirectToAction("Calendar");

        }

    }
}
