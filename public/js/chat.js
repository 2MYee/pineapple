var socket = io('http://localhost:3000');

$('#chat').on('submit', (e)=>{
    socket.emit('send message', $('#name').val(), $('#message').val());
    $('#message').val('');
    $('#message').focus();
    e.preventDefault();
})

socket.on('receive message', (msg)=>{
    $('#chatLog').append(msg + '\n');
    $('#chatLog').scrollTop($('#chatLog')[0].scrollHeight);
})

socket.on('change name', (name)=>{
    $('#name').val(name);
})

// socket.on('news', (data)=> { 
//     console.log(data); 
//     socket.emit('my other event', { my: 'data' }); 
// });
