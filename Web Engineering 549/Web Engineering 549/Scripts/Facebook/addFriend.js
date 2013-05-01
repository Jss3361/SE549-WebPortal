function addFriend() {
    $("#fb_errors").empty();
    var friendID = document.getElementById('idBox').value;

    if (friendID === "") {
        $('#fb_errors').append('<div class="alert"><a class="close" data-dismiss="alert">&times;</a>Please enter a friend id.</div>');
        return;    
    }
    
    FB.ui(
     {
         method: 'friends.add',
         id: friendID
     });
}