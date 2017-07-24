const path = require('path');
const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

//middleware
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '../public')))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', require('./api'));

app.get('*', function (req, res, next) {
    console.log('the home route was hit by somebody');
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.listen(1337, (err) => {
    if(err){
        throw err;
    } else {
        console.log('listenin on port 1337!')
    }
});

app.use(function (err, req, res, next) {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error.');
});

module.exports = app;