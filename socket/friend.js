module.exports = function(io) {
    io.on('connection', socket => {
        socket.on('joinRequest', (myRequest, cb)=> {
            socket.join(myRequest.sender)
            cb()
        })
        socket.on('friendRequest', (friend, cb)=>{
            io.to(friend.receiever).emit('newFriendRequest', {from: friend.sender, to: friend.receiever})
            cb()
        })
    })
}