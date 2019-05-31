$(document).ready(function(){
    let socket = io();

    socket.on('connect', ()=>{
        console.log('yea..user connnected')
    })

    socket.on('newMessage', (data)=> {
        console.log(data)
    })

    $('#message-form').on('submit', (e)=>{
        e.preventDefault()
        let msg = $('#msg').val()
        socket.emit('createMessage', {
            text: msg
        })
    })
})