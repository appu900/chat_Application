
var socket = io();

let button = document.getElementById('btn');
let inputMessage = document.getElementById('new_message');
let messageList = document.getElementById('message_list');

button.onclick = function exec(){
    socket.emit('message_send',{
        message:inputMessage.value
    });
}

socket.on('mesage_recived',(data) =>{
    let listMessages = document.createElement('li');
    listMessages.innerHTML = data.message;
    messageList.appendChild(listMessages);
})