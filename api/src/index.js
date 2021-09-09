require('dotenv').config();

const express = require('express');
const app = express();
const routes = require('./routes/odontologos');

// Setings
app.set('port', process.env.PORT || 3052);

// Routes
app.use(routes);

// Middlewares
app.use(express.json());

// Starting the server
app.listen(app.get('port'), () => {
    console.log('Server on port ', app.get('port'));
});