using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;

namespace Web_Engineering_549.Models
{
    public class StockComment
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ID { get; set; }
        public System.Int64 User_ID { get; set; }
        public String Stock { get; set; }
        public String Comment { get; set; }
        public DateTime Timestamp { get; set; }
    }
}