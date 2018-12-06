var express = require('express');

var router = express.Router();

// io.sockets.on('connection', (socket)=>{
//     console.log('user connected : ' + socket.id);
//     var name = 'user';
//     io.to(socket.id).emit('change name', name);

//     socket.on('disconnect', ()=>{
//         console.log('user disconnected : ' + socket.id);
//     })
//     socket.on('send message', (name, text)=>{
//         var msg = name + ' : ' + text;
//         console.log(msg);
//         io.emit('receive message', msg);
//     });
//     // socket.emit('news', {hello : 'world!'});
//     // socket.on('my other event', (data)=> { 
//     //     console.log(data); 
//     // });
// })

router.get('/', (req, res) => {
    res.render('chatTest');
})


// module.exports = (io)=>{
//     var app = require('express');
//     var router = app.Router();

//     io.on('connection', (socket)=>{
//         console.log('A user connected 2')
//     })
// }

module.exports = router;
