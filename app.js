const express = require('express');
const expressLayout = require('express-ejs-layouts');
const app = express();

//EJS
app.use(expressLayout);
app.set('view engine', 'ejs');


//ROutes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));

const PORT = 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));