const express = require('express');
const router = express.Router();

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
        errors.push({ msg: 're ladka password glt daaala h tum' });
    }

    //Check pass length 
    if(password.length < 6){
        errors.push({ msg: 're hero password kam se kam 6 length ka hona chahiye' });
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
        res.send('pass');
    }
});

module.exports = router;