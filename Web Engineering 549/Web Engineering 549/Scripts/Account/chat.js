$(document).ready(function () {
    $("#chat_div").chatbox({ 
        id: "chat_div",
        title: "Chat",
        user: "test",
        offset: 20,
        messageSent: function (id, user, msg) {
            FB.api('/me', function (response) {
                $.ajax({
                    url: '/Chat/SendMessage/',
                    data: { message: msg, username: response.first_name },
                    type: 'POST'
                });
            });
        }
    });

    var pusher = new Pusher(pusherAppKey);
    var channel = pusher.subscribe('chat_channel');
    channel.bind('chat_event', function (data) {
        $("#chat_div").chatbox("option", "boxManager").addMsg(data.username, data.message);
        $.ajax({
            url: '/Chat/AddChatHistory/',
            data: { chatMsgId: data.chatMsgId },
            type: 'POST'
        });
    });
});