require('dotenv').config({path: './config.env'});

const cors = require('cors');
const express = require('express');
const mongoSanitize = require('express-mongo-sanitize');

const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');


// app & db config
const port = process.env.PORT;
const app = express();
connectDB();


// middleware
const corsOpts = {
  origin: [process.env.NODE_ENV !== 'production' ? 'http://localhost:3000' : 'https://supweather.netlify.app'],
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
const server = app.listen(port, () => console.log('Listening on port ' + port));

process.on('unhandledRejection', (error, _) => {
  console.log('Logged Error: '+error);
  server.close(() => process.exit(1));
});