$(document).ready(function(){
    let socket = io();
    let room = $("#groupName").val()
    let sender = $("#sender").val()
    socket.on('connect', ()=>{
        console.log('yea..user connnected')
        let params = {
            room : room
        }
        socket.emit("join", params, ()=>{
            console.log(`user has joined ${params.room}`)
        })
    })

    socket.on('newMessage', (data)=> {
        console.log(data)
        let template = $("#message-template").html()
        let message = Mustache.render(template, {
            text : data.text,
            sender: data.sender
        })
        $("#messages").append(message)  
    })

    $('#message-form').on('submit', (e)=>{
        e.preventDefault()
        let msg = $('#msg').val()
        socket.emit('createMessage', {
            text: msg,
            room: room,
            sender: sender
        }, ()=> $('#msg').val(''))
    })
})