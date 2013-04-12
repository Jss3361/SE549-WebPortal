﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Web_Engineering_549.Models
{
    public class ChatMessage
    {
        public Guid ChatMsgId { get; set; }
        public string ChatMsgText { get; set; }
        public DateTime TimeStamp { get; set; }
        public string Author { get; set; }
    }
}