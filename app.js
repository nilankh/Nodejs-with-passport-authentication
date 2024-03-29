const express = require('express');
const expressLayout = require('express-ejs-layouts');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

const app = express();

// passport config
require('./config/passport')(passport);

//Db Config
const db = require('./config/mongoose').MongoURI;

//connect to Mongo
//agar ye use wala ni likhgebge to complain aayefa console me
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected...'))
  .catch((err) => console.log(err));

//EJS
app.use(expressLayout);
app.set('view engine', 'ejs');

//bodyparser
app.use(express.urlencoded({ extended: false }));

// Express Session 
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
    
}));
// passport middleware
app.use(passport.initialize());
app.use(passport.session());

//connect falsh
app.use(flash());

//Global vars
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

//ROutes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));

const PORT = 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));