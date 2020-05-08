const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const passport = require('passport');

//User model
const User = require('../models/User');

//login page
router.get('/login', (req, res) => res.render('login'));

//register page
router.get('/register', (req, res) => res.render('register'));

//Register handle
router.post('/register', (req, res) => {
    // console.log(req.body);
    // res.send('hello');

    const { name, email, password, password2 } = req.body;
    let errors = [];

    //Check required fiels
    if(!name || !email || !password || !password2){
        errors.push({ msg: 'Please fill in all fields' });

    }

    //check password match
    if(password != password2){
        errors.push({ msg: 'Passwords do not match' });
    }

    //Check pass length 
    if(password.length < 6){
        errors.push({ msg: 'password should be atleast 6 characters' });
    }
    
    if(errors.length > 0){
        res.render('register', {
            errors,
            name,
            email,
            password,
            password2
        });
    }else{
        //validation passed
        User.findOne({ email: email })
        .then(user => {
            if(user){
                //User exists
                errors.push({ msg: 'Emails is already registred ' });
                res.render('register', {
                    errors,
                    name,
                    email,
                    password,
                    password2
                });
            }else{
                const newUser = new User({
                    name,
                    email,
                    password
                });

                // console.log(newUser);
                // res.send('hello');
                // Hash Password

                bcrypt.genSalt(10, (err, salt) => 
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if(err) throw err;
                        // set password to hashed
                        newUser.password = hash;
                        // saved the user
                        newUser.save()
                        .then(user => {
                            req.flash('success_msg', 'You are now registerd and can log in');
                            res.redirect('/users/login');
                        })
                        .catch(err => console.log(err));
                }))

            }
        });
    }
});

// Login Handle
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect:'/dashboard',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next);
});
// Logout handle
router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/users/login');
});


module.exports = router;