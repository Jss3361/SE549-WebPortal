using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Web_Engineering_549.Models;

namespace Web_Engineering_549.Services
{
    public class ChatService
    {
        public Guid SaveChatMessage(ChatMessage msg) 
        {
            return Guid.Empty;
        }

        public bool AddChatHistoryItem(Guid chatMsgId, Guid accountId)
        {
            return true;
        }
    }
}