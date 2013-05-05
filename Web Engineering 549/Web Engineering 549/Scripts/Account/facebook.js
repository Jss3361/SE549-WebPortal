window.fbAsyncInit = function () {
    FB.init({
        appId: fbAppId, // App ID
        channelUrl: fbChannelUrl, // Channel File
        status: true, // check login status
        cookie: true, // enable cookies to allow the server to access the session
        xfbml: true  // parse XFBML
    });

    FB.getLoginStatus(function (response) {
        if (response.status === 'connected') {
            $.ajax({
                url: 'https://graph.facebook.com/me/home?access_token=' + response.authResponse.accessToken,
                type: 'GET',
                dataType: 'json'
            }).done(function (data) {
                var statusDiv = $('#friendStatusUpdates');
                var html = '';
                var count = 0;
                $.each(data.data, function () {
                    if (count == 10) return;
                    if (this.type === 'status' && this.message) {
                        html += "<div style=\"border-bottom-style:solid;border-bottom-width:1px;border-bottom-color:black;\"><div style=\"padding:2px\"><b>" + this.from.name + "</b></div>" + "<p>" + this.message + "</p></div>";
                        count++;
                    }
                });
                $('#loadingStatusUpdates').hide();
                statusDiv.append(html);
            });
        }
    });

    (function (d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.net/en_US/all.js#xfbml=1&appId=" + fbAppId;
        fjs.parentNode.insertBefore(js, fjs);
    } (document, 'script', 'facebook-jssdk'));
};

// Load the SDK Asynchronously
(function (d) {
    var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
    if (d.getElementById(id)) { return; }
    js = d.createElement('script'); js.id = id; js.async = true;
    js.src = "//connect.facebook.net/en_US/all.js";
    ref.parentNode.insertBefore(js, ref);
} (document));