using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Web_Engineering_549.Models;
using Web_Engineering_549.Services;

namespace Web_Engineering_549.Controllers
{
    public class CalendarController : BaseController
    {
        CalendarService calendarService = new CalendarService();
        AccountService accountservice = new AccountService();

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
        public ActionResult SaveEvent(String event_title, DateTime event_start_date, String event_description, String event_location)
        {
            var calendar_event = new CalendarEvent()
            {
                title = event_title,
                start_date = event_start_date,
                user_id = accountservice.getUserID(base.GetSession()),
                description = event_description,
                location = event_location
            };

            calendarService.SaveEvent(calendar_event);

            return new EmptyResult();
        }

        [HttpGet]
        public ActionResult GetEvents()
        {
            List<CalendarEvent> events = new List<CalendarEvent>();

            events = calendarService.getEvents(accountservice.getUserID(base.GetSession()));

                JsonResult result = new JsonResult();
            result.Data = events;
            result.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
            return result;
        }

    }
}
