const express = require('express');
const expressLayout = require('express-ejs-layouts');
const mongoose = require('mongoose');

const app = express();

//Db Config
const db = require('./config/mongoose').MongoURI;

//connect to Mongo
//agar ye use wala ni likhgebge to complain aayefa console me
mongoose.connect(db,{ useNewUrlParser: true })
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));

//EJS
app.use(expressLayout);
app.set('view engine', 'ejs');

//bodyparser
app.use(express.urlencoded({ extended: false }));


//ROutes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));

const PORT = 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));