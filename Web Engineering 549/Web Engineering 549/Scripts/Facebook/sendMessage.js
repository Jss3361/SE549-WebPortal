function send() {
    $("#fb_errors").empty();
    var link = document.getElementById('linkBox').value;

    if(link === "") {
        $("#fb_errors").append('<div class="alert alert-error"><a class="close" data-dismiss="alert">&times;</a>Please enter a link.');
        return
    }

    FB.ui({
        method: 'send',
        link: link
    });
}