const axios = require('axios');
const iplocation = require('iplocation');

const ErrorResponse = require('../utils/errorResponse');


exports.location = async (req, res, next) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  try {
    const location = await axios.get('https://ipapi.co/' + req.params.ip + '/json/', config);

    if (!location)
      return next(new ErrorResponse('Could not retrieve user location via IP.', 404));

    return res.status(200).json({ success: true, location: location.data });

  } catch (error) { console.log(error); return next(new ErrorResponse('Could not retrieve user location via IP.', 404)); }
};