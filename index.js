const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const db = require('./config/mongoose');

app.use(express.urlencoded());
app.use(cookieParser());
app.use('/', require('./routes/index'));


// app.use(cookieParser());

// set up the view engine
app.set('view engine', 'ejs');
app.set('views','./views');


app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port: ${port}`);
});