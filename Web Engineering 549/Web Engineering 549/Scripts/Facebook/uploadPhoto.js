function upload() {




    var imgURL = "~\images\gw001.jpg"; //change with your external photo url
    var token = FB.getAuthResponse()['accessToken'];

    FB.api('/me/photos', 'post', {
        message: 'photo description',
        status: 'success',
        url: imgURL,
        access_token: token
    }, function (response) {

        if (!response || response.error) {
            alert('Error occured');
        } else {
            alert('success');
        }

    });
}