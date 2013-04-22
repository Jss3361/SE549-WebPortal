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
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public System.Int64 ID { get; set; }
        public System.Int64 userID { get; set; }
        public String stock { get; set; }
        public String comment { get; set; }
        public DateTime timestamp { get; set; }
    }
}