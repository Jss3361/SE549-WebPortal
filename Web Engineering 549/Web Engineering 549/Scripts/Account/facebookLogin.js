
(function () {
    // Load the SDK Asynchronously
    (function (d) {
        var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
        if (d.getElementById(id)) { return; }
        js = d.createElement('script'); js.id = id; js.async = true;
        js.src = "//connect.facebook.net/en_US/all.js";
        ref.parentNode.insertBefore(js, ref);
    } (document));

    window.fbAsyncInit = function () {
        FB.init({
            appId: fbAppId, // App ID
            channelUrl: fbChannelUrl, // Channel File
            status: true, // check login status
            cookie: true, // enable cookies to allow the server to access the session
            xfbml: true  // parse XFBML
        });

        (function (d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s); js.id = id;
            js.src = "//connect.facebook.net/en_US/all.js#xfbml=1&appId=" + fbAppId;
            fjs.parentNode.insertBefore(js, fjs);
        } (document, 'script', 'facebook-jssdk'));

        FB.Event.subscribe('auth.authResponseChange', function (response) {
            if (response.status == "connected") {
                loginPost(response.authResponse);
            }
        });

    };

    var countDown = 3;
    var loginPost = function (fbResponse) {
        $('#loginLoader').show();
        $.ajax({
            url: "/Account/Login",
            type: 'POST',
            data: {
                userID: fbResponse.userID,
                signedRequest: fbResponse.signedRequest,
                accessToken: fbResponse.accessToken,
                expiresIn: fbResponse.expriesIn
            }
        }).done(function (data) {
            $('#redirectLoader').show();
            setInterval(function () {
                if (countDown === 0) {
                    window.location.href = data.redirect;
                }

                $('#redirectLoader').html('Redirecting to dashboard in ' + countDown);
                countDown = countDown - 1;
            }, 1000);
        }).fail(function () {
            alert("error");
        }).always(function () {
            $('#loginLoader').hide();
        });
    }
} ());
