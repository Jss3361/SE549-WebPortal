function send(){
var link = document.getElementById('linkBox').value

if(link == ""){
var message = document.createTextNode("You must specify a link.");
if(document.getElementById('linkError').childNodes.length>0){
document.getElementById('linkError').removeChild(document.getElementById("linkError").firstChild);
}
document.getElementById('linkError').appendChild(message);
}

if(link != ""){
if(document.getElementById('linkError').childNodes.length>0){
document.getElementById('linkError').removeChild(document.getElementById("linkError").firstChild);
}
FB.ui({
    method: 'send',
    link: link,
});
}
}