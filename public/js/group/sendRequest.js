$(document).ready(function(){
    let socket = io();
    let room = $("#groupName").val()
    console.log(room)
    let sender = $("#sender").val()
    socket.on('connect', function(){
        let params = {
            sender: sender
        }
        socket.emit('joinRequest', params, ()=>{
            console.log('joined')
        })
    })

    socket.on('newFriendRequest', function(friend){
        $('#reload').load(location.href + '#reload')
    })

    $('#add_friend').on('submit', function(e){
        let receiverName = $("#receiverName").val()
        console.log(`he:${receiverName}`)
        e.preventDefault(e)
        $.ajax({
            url:'/group/' + room,
            type: 'POST',
            data: {
                receiverName: receiverName
            },
            success: function(){
                console.log('dfkjhfdkjfg')
                socket.emit('friendRequest', {
                    receiever: receiverName,
                    sender: sender
                }, function(){
                    console.log('request sent')
                })
            }
        })
    })

    $('#accept_friend').on('click', function(){
        let senderId = $("#senderId").val()
        let senderName = $("#senderName").val()

        $.ajax({
            url:'/group/' + room,
            type: 'POST',
            data: {
                senderId: senderId,
                senderName: senderName
            },
            success: function(){
                $(this).parent().eq(1).remove()
            }
        })
        $('#reload').load(location.href + '#reload')
    })

    $('#cancel_friend').on('click', function(){
        let userIds = $("#user_Id").val()
        console.log(`userrrr:${userIds}`)
        $.ajax({
            url:'/group/' + room,
            type: 'POST',
            data: {
               userIds: userIds
            },
            success: function(){
                $(this).parent().eq(1).remove()
            }
        })
        $('#reload').load(location.href + '#reload')
    })
})