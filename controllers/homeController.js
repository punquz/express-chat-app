const mongoose = require('mongoose')

const Club = require('../models/club')

exports.getHome = (req, res, next) => {
    Club.find({})
    .then(club => {
        Club.aggregate([
            { $group: { _id: "$country"} }
            
          ])
        .then(fil => {
            console.log(fil)
            res.render('home', {
                title: "home page",
                user: req.user,
                club,
                fil
            })
        })
        
    })
    .catch(err => console.log(err))
}