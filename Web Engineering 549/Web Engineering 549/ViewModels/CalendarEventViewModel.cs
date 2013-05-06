using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;

namespace Web_Engineering_549.ViewModels
{
    public class CalendarEventViewModel
    {
        public String Title { get; set; }
        public double Date { get; set; }
        public int ID {get; set;}
    }
}