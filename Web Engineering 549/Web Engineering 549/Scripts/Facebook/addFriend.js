﻿function addFriend(){
    FB.ui(
     { 
      method: 'friends.add', 
      id: 15703884, // assuming you set this variable previously...
     }, 
     function(param){

      console.log(param);

            // If they cancel params will show: 
            //    {action:false, ...}
            // and if they send the friend request it'll have:
            //    {action:true, ...}
            // and if they closed the pop-up window then:
            //    param is undefined
     }
    );
    }