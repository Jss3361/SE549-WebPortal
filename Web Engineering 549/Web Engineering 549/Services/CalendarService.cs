using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Web_Engineering_549.Models;
using Web_Engineering_549.Database;
using Web_Engineering_549.ViewModels;

namespace Web_Engineering_549.Services
{
    public class CalendarService
    {

        public CalendarEventViewModel SaveEvent(CalendarEvent calendar_event)
        {
            try
            {
                using (var context = new EntityContext())
                {
                    context.CalendarEvent.Add(calendar_event);
                    context.SaveChanges();
                    var time = (calendar_event.start_date - new DateTime(1970, 1, 1).ToLocalTime()).TotalSeconds * 1000;
                    return new CalendarEventViewModel(){Title = calendar_event.title, Date = time};
                }
            }
            catch (Exception ex)
            {
                return null;
            }
        }


        public List<CalendarEventViewModel> getEvents(long userid, DateTime start, DateTime end)
        {
            try
            {
                using (var context = new EntityContext())
                {
                    var vms = new List<CalendarEventViewModel>();
                    var events = context.CalendarEvent.Where(
                        p => p.user_id == userid && p.start_date >= start && p.start_date <= end);
                    foreach(var _event in events) 
                    {
                        vms.Add(new CalendarEventViewModel() { Date = (_event.start_date - new DateTime(1970, 1, 1).ToLocalTime()).TotalSeconds * 1000, Title = _event.title });
                    }

                    return vms;
                }

            }
            catch (Exception ex)
            {
                return null;
            }
        }

    }
}