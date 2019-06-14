const User = require("../models/user");
const async = require("async");

exports.getGroup = (req, res, next) => {
  const { name } = req.params;
  User.findById({_id: req.user._id})
  .populate('request.userId')
  .exec()
  .then(result => {
      console.log(result)
    res.render("groupchat/group", {
        groupName: name,
        user: req.user,
        data: result
      });
  })
  .catch(err => console.log(err))
};

exports.postGroupPage = (req, res, next) => {
  let { receiverName } = req.body;
  async.parallel([
      function(cb) {
          if(receiverName){
            User.find({username: receiverName })
            .then(rec => {
                let recId = rec[0]._id
                User.findByIdAndUpdate(recId, {
                    $push:{request: {
                        userId: req.user._id,
                        username: req.user.username
                    }},
                    $inc: {totalRequest: 1}
                }, function(err, success) {
                    if(err) console.log(err)
                    else cb(err, success)
                })
            })
          }
      },
      function(cb) {
        if(receiverName) {
            User.findByIdAndUpdate(req.user._id, {
                $set:{sentRequest :{
                    username: req.body.receiverName
                }}
            }, function(err, success) {
                    if(err) console.log(err)
                    else{
                        console.log(success)
                        cb(err, success)
                    }
                })
        }
      }
  ], (err, results) => {
       res.redirect('/group/' + req.params.name)
  })
  //accepting the request
  async.parallel([
      function(cb) {
          if(req.body.senderId) {
                User.updateOne({
                    '_id': req.user._id,
                    'friendList.friendId': {$ne: req.body.senderId}
                },
                {
                    $push: {friendList: {
                        friendId:req.body.senderId,
                        friendName: req.body.senderName
                    }},
                    $pull: {request: {
                        userId: req.body.senderId,
                        username: req.body.senderName
                    }},
                    $inc: {totalRequest: -1}
                }, (err, count)=> {
                    cb(err, count)
                })
          }
      },
      function(cb) {
        if(req.body.senderId) {
              User.updateOne({
                  '_id': req.body.senderId
              },
              {
                  $push: {friendList: {
                      friendId:req.user._id,
                      friendName: req.user.username
                  }},
                  $pull: {sentRequest: {
                      username: req.user.username
                  }},
              }, (err, count)=> {
                    cb(err, count)
              })
        }
    }
  
  ], (err, results) => {
    res.redirect('/group/' + req.params.name)
  })

  async.parallel([
        //cancel the request
    function(cb) {
        if(req.body.userIds) {
            console.log(`us:${userIds}`)
              User.updateOne({
                  '_id': req.user._id,
                  'request.userId': {$eq: req.body.userIds}
              },
              { 
                  $pull: {request: {
                      userId: req.body.userIds
                  }},
                  $inc: {totalRequest: -1}
              }, (err, count)=> {
                    cb(err, count)
              })
        }
    },
    function(cb) {
        if(req.body.userIds) {
              User.updateOne({
                  '_id': req.body.userIds,
                  'sentRequest.username': {$eq: req.user.username}
              },
              {
                  $pull: {sentRequest: {
                      username: req.user.username 
                  }}
              }, (err, count)=> {
                    cb(err, count)
              })
        }
    }
  ], (err, results) => {
    res.redirect('/group/' + req.params.name)
  })
};
