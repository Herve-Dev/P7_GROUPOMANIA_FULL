const express = require('express');
const bodyParser = require('body-parser');
const userRoute = require('./routes/userRoutes');
const postRoute = require('./routes/postRoutes');
const remarkRoute = require('./routes/remarkRoutes');
const helmet = require('helmet')
const path = require('path');

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(helmet());
app.use('/', userRoute);
app.use('/', postRoute);
app.use('/', remarkRoute);

module.exports = app