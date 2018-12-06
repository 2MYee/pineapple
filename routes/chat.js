var express = require('express');
var io = require('socket.io')(3000);



var router = express.Router();

io.sockets.on('connection', (socket)=>{
    socket.emit('news', {hello : 'world!'});
    socket.on('my other event', (data)=> { 
        console.log(data); 
    });
})

module.exports = router;