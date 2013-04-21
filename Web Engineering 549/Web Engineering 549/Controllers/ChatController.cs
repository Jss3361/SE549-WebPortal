using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using PusherServer;
using Web_Engineering_549.Models;
using Web_Engineering_549.Services;
using Web_Engineering_549.ControllerAttributes;
using System.Web.Configuration;

namespace Web_Engineering_549.Controllers
{
    public class ChatController : BaseController
    {
        ChatService chatService = new ChatService();
        AccountService accountService = new AccountService();

        [Authenticate]
        public ActionResult Index()
        {
            var messages = chatService.GetChatMessages(base.GetSession());
            return View(messages);
        }

        [Authenticate]
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

            var pusher = new Pusher(
                    WebConfigurationManager.AppSettings["PusherAppId"],
                    WebConfigurationManager.AppSettings["PusherAppKey"],
                    WebConfigurationManager.AppSettings["PusherAppSecret"]);
            var result = pusher.Trigger("chat_channel", "chat_event", new { message, username, chatMsgId = chatMessage.ChatMsgId });

            return new EmptyResult();
        }

        [Authenticate]
        [HttpPost]
        public ActionResult AddChatHistory(Guid chatMsgId)
        {
            chatService.AddChatHistoryItem(chatMsgId, base.GetSession());
            return new EmptyResult();
        }

        [Authenticate]
        [HttpPost]
        public ActionResult DeleteChatHistory()
        {
            chatService.DeleteChatHistory(base.GetSession());
            TempData["Message"] = "Chat history was deleted.";
            return RedirectToAction("Index");
        }

    }
}
