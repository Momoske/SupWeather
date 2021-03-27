const express = require('express');

const { location } = require('../controllers/location');

const router = express.Router();

router.route('/ip/:ip').get(location);

module.exports = router;