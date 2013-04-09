function addFriend(){
var friendID = document.getElementById('idBox').value

   if(friendID == ""){
var message = document.createTextNode("You must specify an ID.");
if(document.getElementById('idError').childNodes.length>0){
document.getElementById('idError').removeChild(document.getElementById("idError").firstChild);
}
document.getElementById('idError').appendChild(message);
}


if(friendID != ""){
if(document.getElementById('idError').childNodes.length>0){
document.getElementById('idError').removeChild(document.getElementById("idError").firstChild);
}   FB.ui(
     { 
      method: 'friends.add', 
      id: friendID, 
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
   }