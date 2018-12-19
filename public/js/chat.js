var socket = io.connect('localhost:3000');

window.onload= ()=>{
    getUsername();
}

var username = null;

const getUsername = ()=>{
    $.ajax({
        url: '/calendar/getUsername',
        type: 'post',
        dataType: 'json',
        
        success : (result)=>{
            username = result;
        }
    })
}

socket.on('server message', (data) => {
    $('#chatBody').append(data + '\n');
    $('#chatBody').scrollTop($('#chatBody')[0].scrollHeight);
});
$(document).ready(() => {
    $('#sendForm').submit(() => {
        var $message = $('#sendForm input[name=message]');
        socket.emit('client message', {
            username: username,
            message: $message.val()
        });
        $message.val('');
        return false
    })
})
