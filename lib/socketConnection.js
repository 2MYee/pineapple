const session = require('express-session');

module.exports = (io)=>{
    io.on('connection', (socket)=>{
        socket.on('client message', (data)=>{
            var emit = data.username + ' : ' + data.message;
            io.emit('server message', emit);
        });
        socket.on("error", (err) => {
            console.log("Caught flash policy server socket error: ")
            console.log(err.stack)
        });
    });
}