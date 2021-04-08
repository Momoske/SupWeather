require('dotenv').config({path: './config.env'});

const fs = require('fs');
const cors = require('cors');
const https = require('https');
const helmet = require('helmet');
const express = require('express');
const cookieParser = require('cookie-parser');
const RateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');

const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');


// https config
const cert = process.env.NODE_ENV !== 'production' ? fs.readFileSync('cert.pem', 'utf8') : null;
const key  = process.env.NODE_ENV !== 'production' ? fs.readFileSync('key.pem', 'utf8') : null;
const credentials = {key: key, cert: cert};


// app & db config
const port = process.env.PORT;
const app = express();
connectDB();


// middleware
const corsOpts = {
  origin: [process.env.NODE_ENV !== 'production' ? 'https://localhost:3000' : 'https://supweather.netlify.app'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
};

const rateLimiter = new RateLimit({
  windowMs: 600000, // 10 minutes
  max: 100 // 100 requests max
});

app.use(helmet());
app.use(cookieParser());
app.use(cors(corsOpts));
app.use(express.json());
app.use(mongoSanitize());

app.use('/api/v1', rateLimiter);
app.use('/api/v1/auth', require('./routes/auth'));
app.use('/api/v1/user', require('./routes/user'));
app.use('/api/v1/location', require('./routes/location'));

app.use(errorHandler); // needs to be last middleware used here


// api endpoints
app.get('/', (req, res) => res.status(200).send('Welcome to SupWeather!'));


// listener
const httpsServer = https.createServer(credentials, app);
const server = process.env.NODE_ENV !== 'production'
  ?
httpsServer.listen(port, () => console.log('Listening on port ' + port))
  :
app.listen(port, () => console.log('Listening on port ' + port));

process.on('unhandledRejection', (error, _) => {
  console.log('Logged Error: '+error);
  server.close(() => process.exit(1));
});