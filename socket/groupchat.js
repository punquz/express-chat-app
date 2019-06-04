module.exports = (io, Users) => {
    const users = new Users()
    io.on('connection', (socket)=> {
        console.log('user connected')
        socket.on("join", (params, cb) =>{
            socket.join(params.room)
            users.AddUserData(socket.id, params.sender, params.room)
            io.to(params.room).emit('usersList', users.GetUsersList(params.room))
            console.log(users)
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
        socket.on('disconnect', ()=>{
            let user = users.RemoveUser(socket.id)
            if(user){
                io.to(user.room).emit('usersList', users.GetUsersList(user.room))
            }
        })
    })
}