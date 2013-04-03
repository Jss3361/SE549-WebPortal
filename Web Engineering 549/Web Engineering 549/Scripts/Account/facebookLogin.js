
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
            appId: '449592011787745', // App ID
            channelUrl: 'http://localhost:50055/Content/channel.html', // Channel File
            status: true, // check login status
            cookie: true, // enable cookies to allow the server to access the session
            xfbml: true  // parse XFBML
        });

        (function (d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s); js.id = id;
            js.src = "//connect.facebook.net/en_US/all.js#xfbml=1&appId=449592011787745";
            fjs.parentNode.insertBefore(js, fjs);
        } (document, 'script', 'facebook-jssdk'));

        //        FB.getLoginStatus(function (response) {
        //            if (response.status === 'connected') {
        //                //loginPost(response.authResponse);
        //            } else if (response.status === 'not_authorized') {
        //                // not_authorized
        //                alert('not_authorized');
        //            } else {
        //                // not_logged_in
        //                alert('not logged in');
        //            }
        //        });

        FB.Event.subscribe('auth.authResponseChange', function (response) {
            if (response.status == "connected") {
                loginPost(response.authResponse);
            }
        });

    };

    var loginPost = function (fbResponse) {
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
            window.location.href = data.redirect;
        }).fail(function () {
            alert("error");
        });
    }
} ());
