using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;

namespace Web_Engineering_549.Models
{
    public class StockTransaction
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public System.Int32 Trans_ID { get; set; }
        public System.Int64 User_ID { get; set; }
        public String Ticker_Symbol { get; set; }
        public String Stock_Name { get; set; }
        public int Quantity { get; set; }
        public Decimal Rate { get; set; }
        public DateTime Timestamp { get; set; }
    }
}