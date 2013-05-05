using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;

namespace Web_Engineering_549.Models
{
    public class CalendarEvent
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public System.Int32 event_id { get; set; }
        public String title { get; set; }
        public DateTime start_date { get; set; }
        public System.Int64 user_id { get; set; }
        public String description { get; set; }
        public String location { get; set; }
    }
}