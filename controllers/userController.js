const User = require('../models/user');
const bcrypt = require('bcrypt')
const passport = require('passport')

//get signup
exports.getSignUp = (req, res, next) => {
    res.render('signup')
}

//postsignup
exports.postSignUp = (req, res, next) => {
    const { username, email, password, password2 } = req.body;

    let errors = []

    //check all fields
  if (!username || !email || !password || !password2) {
    errors.push({ msg: "Please fill in all fields" });
  }
   //password check
   if (password !== password2) {
    errors.push({ msg: "passwords do not match" });
  }

  //check for password length
  if (password.length < 6) {
    errors.push({ msg: "password must be at least of 6 character" });
  }
  if (errors.length > 0) {
    res.render("signup", {
      errors,
      username,
      email,
      password,
      password2
    });
  } else {
    User.findOne({$or: [{email: email}, {username: username}]
     }).then(user => {
      if (user) {
        errors.push({ msg: "email or username is already in use" });
        res.render("signup", {
          errors,
          username,
          email,
          password,
          password2
        });
      } else {
        const user = new User({
          username,
          email,
          password
        });
        //hash password
        bcrypt.genSalt(12, (err, salt) =>
          bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) throw new err();
            user.password = hash;

            //save user
            user
              .save()
              .then(user => {
                req.flash("success_msg", "You are now registered")
                // res.redirect("/auth/local-login");
                res.redirect('/login')
              })
              .catch(err => console.log(err));
          })
        );
      }
    });
  }
}

//get login
exports.getLogin = (req, res, next) => {
    res.render('login')
}

//local login
exports.postLogin = (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/home',
        failureRedirect: '/login',
        failureFlash: true
    })(req, res, next);
}

// auth logout
exports.logout = (req, res) => {
    // handle with passport
    req.logout();
    req.flash('success_msg', "You are successfully logged out")
    res.redirect("/login"); 
  };