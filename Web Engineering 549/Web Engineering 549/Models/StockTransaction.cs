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
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public System.Int64 transID { get; set; }
        public System.Int64 userID { get; set; }
        public String tickerSymbol { get; set; }
        public String stockName { get; set; }
        public int quantity { get; set; }
        public double rate { get; set; }
        public DateTime timeStamp { get; set; }
    }
}