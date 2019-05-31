module.exports = io => {
    io.on('connection', (socket)=> {
        console.log('user connected')
        socket.on('createMessage', msg => {
            console.log(msg)
            io.emit('newMessage', {
                text: msg.text
            })
        })
    })
}