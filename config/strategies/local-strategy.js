const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../../models/user');



module.exports = function() {
    passport.use(new LocalStrategy({usernameField: 'email'}, (email, password, done) => {
        User.findOne({email: email})
        .then(user => {
            if (!user) { return done(null, false, {message: 'user with given email not found' }); }

            //match password
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if(err) throw new err;

                if(isMatch) {
                    return done(null, user)
                }else {
                    return done(null, false, {message:  `password didn't match!!!` });
                }
            })

        })
        .catch(err => console.log(err))
    })
    )

}