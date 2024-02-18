const express = require('express');
const http = require('http');
const soketio = require('socket.io');

const connect = require('./config/databaseConfig');
const Chat = require("./models/chat")

const app = express();
const server = http.createServer(app);
const io = soketio(server);


app.set('view engine','ejs');
app.use('/',express.static(__dirname + '/public'));

io.on('connection',(socket) =>{

    console.log('A user connected',socket.id);

    socket.on('join_room',(data) =>{
         socket.join(data.roomid);
    })

    socket.on('message_send',async (data) =>{
       console.log(data);
       const chat = await Chat.create({
        roomId:data.roomid,
        user:data.username,
        content:data.message,
       })
       io.to(data.roomid).emit('mesage_recived',data); 
    //    socket.emit('mesage_recived',data); // for single client
    //    socket.broadcast.emit('mesage_recived',data); // for all clients except sender
    })

    socket.on('typing',(data) =>{
        socket.broadcast.to(data.roomid).emit('someone_typing');
    })


})

app.get('/chat/:roomid',async (request,response) =>{
    const chats = await Chat.find({roomId:request.params.roomid})
    response.render('index',{
        name:"appu",
        id:request.params.roomid,
        chats:chats
    })
})




server.listen(5000,async() =>{
    console.log('Server is running on port 5000');
    await connect();
})



