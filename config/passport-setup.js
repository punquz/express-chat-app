const passport = require('passport');
const User = require('../models/user');

module.exports = function(app) {
    app.use(passport.initialize());
    app.use(passport.session());
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
    
    passport.deserializeUser((id, done) => {
        User.findById(id).then((user) => {
            done(null, user);
        });
    });
    
 
    // require("./strategies/google-strategy")();
    // require("./strategies/facebook-strategy")();
    // require("./strategies/twitter-strategy")();
    require("./strategies/local-strategy")();
}

