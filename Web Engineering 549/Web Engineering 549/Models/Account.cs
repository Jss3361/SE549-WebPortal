using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;

namespace Web_Engineering_549.Models
{
    public class Account
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public System.Int64 userID { get; set; }
        public Guid? sessionID { get; set; }
        public DateTime? sessionExpiresAt { get; set; }
        public virtual List<ChatMessage> ChatMessages { get; set; }
    }
}