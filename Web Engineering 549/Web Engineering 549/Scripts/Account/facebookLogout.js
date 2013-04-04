$('#logoutLink').click(function (event) {
    event.preventDefault();
    FB.logout(function (response) {
        $.ajax({
            url: "/Account/Logout",
            type: 'POST'
        }).done(function (data) {
            window.location.href = data.redirect;
        }).fail(function () {
            alert("error");
        }).always(function () {
        });
    });
});

