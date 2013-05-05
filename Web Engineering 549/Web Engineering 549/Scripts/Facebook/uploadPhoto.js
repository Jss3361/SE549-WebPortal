$(document).ready(function () {
    $('.uploadPhoto').click(function () {
        var _this = $(this);
        var imgURL = _this.prev().attr('src');

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
                alert('Image added to Facebook.');
            }

        });

    });
});