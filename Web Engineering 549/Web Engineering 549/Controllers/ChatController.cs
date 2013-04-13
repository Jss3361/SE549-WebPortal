using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using PusherServer;
using Web_Engineering_549.Models;
using Web_Engineering_549.Services;
using Web_Engineering_549.ControllerAttributes;

namespace Web_Engineering_549.Controllers
{
    public class ChatController : BaseController
    {
        ChatService chatService = new ChatService();
        AccountService accountService = new AccountService();

        [Authenticate]
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public ActionResult SendMessage(string message, string username)
        {
            var chatMessage = new ChatMessage()
            {
                ChatMsgId = Guid.NewGuid(),
                ChatMsgText = message,
                Author = username,
                TimeStamp = DateTime.Now
            };

            chatService.SaveChatMessage(chatMessage);

            var pusher = new Pusher("41501", "fe769be86f1e807ab53c", "c6cb978e7721fbd3b6cd");
            var result = pusher.Trigger("test_channel", "test_event", new { message, username, chatMsgId=chatMessage.ChatMsgId });

            return new EmptyResult();
        }

        public ActionResult AddChatHistory(Guid chatMsgId)
        {
            chatService.AddChatHistoryItem(chatMsgId, base.GetSession());
            return new EmptyResult();
        }

    }
}
