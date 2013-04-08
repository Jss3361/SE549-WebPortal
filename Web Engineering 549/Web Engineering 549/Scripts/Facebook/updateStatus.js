
        FB.init({ appId: "449592011787745", status: true, cookie: true });

        function postToFeed() {

            // calling the API ...
            var obj = {
                method: 'feed',
            };

            function callback(response) {
                document.getElementById('msg').innerHTML = "Post ID: " + response['post_id'];
            }

            FB.ui(obj, callback);
        }
   