const express= require('express')
const app= express();
const http= require('http').createServer(app)

const PORT = process.env.PORT || 3000

http.listen(PORT, () =>{
    console.log(`The port is ${PORT}`)
})
app.use(express.static(__dirname + '/public'))
app.get('/',(req, res) =>{
    res.sendFile(__dirname + '/index.html')

})
const io =require('socket.io')(http)
const user={};
io.on('connection',socket=>{
   
    socket.on('new-user-joined',name=>{
        
        user[socket.id]=name;
        socket.broadcast.emit('user-joined',name);
    });
    socket.on('send', message=>{
        socket.broadcast.emit('recive',{message: message,name: user[socket.id]})
    });
    socket.on('disconnect', message=>{
        socket.broadcast.emit('LEFT',user[socket.id]);
        delete user[socket.id];
    });
})
