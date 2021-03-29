const JsonWebToken = require('jsonwebtoken');

const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');


exports.addFavorite = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
    token = req.headers.authorization.split(' ')[1];

  if (!token)
    return next(new ErrorResponse('Could not get user info, please try again or sign out then in again.', 401));

  try {
    const decoded = JsonWebToken.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user)
      return next(new ErrorResponse('Could not get user info, please try again or sign out then in again.', 404));

    if (user.favorites.includes(req.params.city))
      return next(new ErrorResponse('You have already added ' + req.params.city.substring(0, req.params.city.indexOf(',')) + ' to your favorites.', 409));

    let favorites = user.favorites;
    favorites.push(req.params.city);
    user.favorites = favorites;

    await user.save();

    return res.status(201).json({
      success: true, user,
      data: 'City successfully added to favorites.'
    });

  } catch (error) { return next(new ErrorResponse('Could not add city to favorites, please try again.', 401)); }
};


exports.removeFavorite = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
    token = req.headers.authorization.split(' ')[1];

  if (!token)
    return next(new ErrorResponse('Could not get user info, please try again or sign out then in again.', 401));

  try {
    const decoded = JsonWebToken.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user)
      return next(new ErrorResponse('Could not get user info, please try again or sign out then in again.', 404));

    let favorites = user.favorites;
    if (favorites.indexOf(req.params.city)) favorites.splice(favorites.indexOf(req.params.city), 1);
    user.favorites = favorites;

    await user.save();

    return res.status(201).json({
      success: true, user,
      data: 'City successfully removed from favorites.'
    });

  } catch (error) { return next(new ErrorResponse('Could not remove city from favorites, please try again.', 401)); }
};