using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Web_Engineering_549.Models;
using Web_Engineering_549.Database;

namespace Web_Engineering_549.Services
{
    public class ChatService
    {
        public bool SaveChatMessage(ChatMessage msg) 
        {
            try
            {
                using (var context = new EntityContext())
                {
                    context.ChatMessage.Add(msg);
                    context.SaveChanges();
                    return true;
                }
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public bool AddChatHistoryItem(Guid chatMsgId, Guid sessionId)
        {
            try
            {
                using (var context = new EntityContext())
                {
                    var chatMessage = context.ChatMessage.SingleOrDefault(x => x.ChatMsgId == chatMsgId);
                    var account = context.Account.SingleOrDefault(x => x.sessionID == sessionId);
                    chatMessage.Accounts.Add(account);
                    context.SaveChanges();
                    return true;
                }
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public List<ChatMessage> GetChatMessages(Guid sessionId)
        {
            using (var context = new EntityContext())
            {
                var account = context.Account.SingleOrDefault(x => x.sessionID == sessionId);
                return account.ChatMessages.OrderByDescending(x=> x.TimeStamp).ToList();
            }
        }

        public bool DeleteChatHistory(Guid sessionId)
        {
            try
            {
                using (var context = new EntityContext())
                {
                    var account = context.Account.SingleOrDefault(x => x.sessionID == sessionId);
                    account.ChatMessages.Clear();
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