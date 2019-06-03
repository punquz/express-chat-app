module.exports = io => {
    io.on('connection', (socket)=> {
        console.log('user connected')
        socket.on("join", (params, cb) =>{
            socket.join(params.room)
            cb()
        })
        socket.on('createMessage', (msg, cb) => {
            console.log(msg)
            io.to(msg.room).emit('newMessage', {
                text: msg.text,
                room : msg.room,
                sender : msg.sender
            })
            cb()
        })
    })
}