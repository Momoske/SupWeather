const express = require('express');

const { addFavorite, removeFavorite } = require('../controllers/user');

const router = express.Router();

router.route('/addfavorite/:city').put(addFavorite);
router.route('/removefavorite/:city').put(removeFavorite);

module.exports = router;