const User = require('../models/user')
const Club = require('../models/club')

exports.getHome = (req, res, next) => {
    let total;
    Club.find({})
    .then(club => {
         Club.aggregate([
            { $group: { _id: "$country"} }
            
          ])
        .then(fils => {
            total = fils;
           return User.findById({_id: req.user._id})
            .populate('request.userId')
            .exec()
        })
        .then(result => {
            res.render('home', {
                title: "home page",
                user: req.user,
                club,
                fil : total,
                data: result
            })
        })
        
    })
    .catch(err => console.log(err))
}