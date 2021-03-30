require('dotenv').config({path: './config.env'});

const mongoSanitize = require('express-mongo-sanitize');
const express = require('express');
const cors = require('cors');

const errorHandler = require('./middleware/error');
const connectDB = require('./config/db');


// app & db config
const port = process.env.PORT;
const app = express();
connectDB();


// middleware
var corsOpts = {
  origin: ['http://localhost:3000', 'https://supweather.netlify.app'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
};

app.use(cors(corsOpts));
app.use(express.json());
app.use(mongoSanitize());

app.use('/api/v1/auth', require('./routes/auth'));
app.use('/api/v1/user', require('./routes/user'));
app.use('/api/v1/location', require('./routes/location'));

app.use(errorHandler); // needs to be last middleware used here


// api endpoints
app.get('/', (req, res) => res.status(200).send('Welcome to SupWeather!'));


// listener
app.listen(port, () => console.log('Listening on localhost:' + port));

process.on('unhandledRejection', (error, _) => {
  console.log('Logged Error: '+ error);
  server.close(() => process.exit(1));
});