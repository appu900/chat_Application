const express = require('express');
const http = require('http');
const soketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = soketio(server);


app.use('/',express.static(__dirname + '/public'));

io.on('connection',(socket) =>{
    console.log('A user connected',socket.id);
    socket.on('message_send',(data) =>{
       console.log(data);
    //    io is for all clients
    //    io.emit('mesage_recived',data);
        //   socket.emit('mesage_recived',data); // for single client
        socket.broadcast.emit('mesage_recived',data); // for all clients except sender
    })
})


server.listen(5000,() =>{
    console.log('Server is running on port 5000');
})



