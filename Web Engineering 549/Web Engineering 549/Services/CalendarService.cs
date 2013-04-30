using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Web_Engineering_549.Models;
using Web_Engineering_549.Database;

namespace Web_Engineering_549.Services
{
    public class CalendarService
    {

        public bool SaveEvent(CalendarEvent calendar_event)
        {
            try
            {
                using (var context = new EntityContext())
                {
                    context.CalendarEvent.Add(calendar_event);
                    context.SaveChanges();
                    return true;
                }
            }
            catch (Exception ex)
            {
                return false;
            }
        }





    }
}