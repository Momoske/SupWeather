const crypto = require('crypto');
const JsonWebToken = require('jsonwebtoken');

const User = require('../models/User');
const sendEmail = require('../utils/sendEmail');
const ErrorResponse = require('../utils/errorResponse');


exports.register = async (req, res, next) => {
  const {username, email, password, passCheck} = req.body;

  // Do all checks for field entries before checking uniqueness of username & email address
  if (!(username && email && password && passCheck))
    return next(new ErrorResponse('Please fill in all the fields.', 400));

  if (username.includes('@') || username.includes(' '))
    return next(new ErrorResponse('Your username cannot contain "@" or a whitespace.', 400));

  if (password.length < 6)
    return next(new ErrorResponse('Your password should be at least 6 characters long.', 400));

  if (password !== passCheck)
    return next(new ErrorResponse('Passwords do not match.', 400));

      
  try {
    // Check uniqueness of username
    const userExists = await User.findOne({username});
    if (userExists)
      return next(new ErrorResponse(`Username '${username}' is already in use, please register with a different one.`, 409));

    // Check uniqueness of email address
    const emailExists = await User.findOne({email});
    if (emailExists)
      return next(new ErrorResponse(`Email address '${email}' is already in use, please register with a different one.`, 409));

    const user = await User.create({username, email, password, favorites: []});

    sendToken(user, 201, res);

  } catch (error) { next(new ErrorResponse('Could not register.', 401)); }
};


exports.login = async (req, res, next) => {
  const {login, password} = req.body;

  if (!login || !password)
    return next(new ErrorResponse('Please provide both email and password in order to login.', 400));

  try {
    const user = await User.findOne({[login.includes('@') ? 'email' : 'username']: login}).select('+password');

    if (!user)      
      return next(new ErrorResponse('Invalid credentials.', 404));

    const isMatch = await user.matchPasswords(password);

    if(!isMatch)
      return next(new ErrorResponse('Invalid credentials.', 401));

    sendToken(user, 200, res);

  } catch (error) { next(new ErrorResponse('Could not sign you in.', 401)); }
};


exports.logout = async (req, res, next) => {
  if (!req.cookies.authToken)
    return next(new ErrorResponse('You cannot logout without being signed in.', 400));

  res.clearCookie('authToken').json({success: true});
};


exports.forgotpw = async (req, res, next) => {
  const {forgot} = req.body;

  try {
    const user = await User.findOne({[forgot.includes('@') ? 'email' : 'username']: forgot});

    if (!user)
      return next(new ErrorResponse(`${forgot.includes('@') ? 'Email address' : 'Username'} could not be found.`, 404))

    const resetToken = user.getResetPasswordToken();
    await user.save();

    const content = `
      <h2>${user?.username},</h2>
      <h3>You requested a password reset.</h3><br/>
      <p>Please copy this reset code back on the website:
        <br/>${resetToken}
      </p><br/>
      <p>If the reset code matches, your account will be secured with your new password.</p>
      <h4>Thank you for using our website and making your account more secure.</h4>
      <p>SupWeather &copy; - 2021</p>
    `;

    try {

      sendEmail({email: user.email, subject: 'SupWeather - Password Reset Request', content});

      res.status(200).json({
        success: true,
        data: 'Email sent successfully.'
      });

    } catch (error) {

      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save();
     
      return next(new ErrorResponse('Email could not be sent.', 500));
    }

  } catch (error) { next(new ErrorResponse('Email could not be sent.', 500)); }

};


exports.resetpw = async (req, res, next) => {
  const {password, passCheck} = req.body;
  const resetPasswordToken = crypto.createHash('sha256').update(req.params.resetToken).digest('hex');

  if (!password || !passCheck)
    return next(new ErrorResponse('Please fill in all the fields.', 400));

  if (password.length < 6)
    return next(new ErrorResponse('Your password should be at least 6 characters long.', 400));

  if (password !== passCheck)
    return next(new ErrorResponse('Passwords do not match.', 400));

  try {
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: {$gt: Date.now()} // Check if current time is still in the token expiration timeframe
    });

    if (!user)
      return next(new ErrorResponse('The token to reset your password is wrong or has expired. Please reset your password within 15 minutes of sending the reset request.', 400));

    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    return res.status(201).json({
      success: true,
      data: 'Password reset successfully.'
    });

  } catch (error) { next(new ErrorResponse('Could not reset your password.', 401)); }
};


exports.userinfo = async (req, res, next) => {
  const token = req.cookies.authToken;
  
  if (!token)
    return next(new ErrorResponse('Could not get user info, please try again or sign out then in again.', 401));

  try {
    const decoded = JsonWebToken.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user)
      return next(new ErrorResponse('Could not get user info, please try again or sign out then in again.', 404));

    req.user = user;
    return res.status(200).json({success: true, user});

  } catch (error) { return next(new ErrorResponse('Could not get user info, please try again or sign out then in again.', 401)); }
};


exports.deleteUser = async (req, res, next) => {
  const token = req.cookies.authToken;

  if (!token)
    return next(new ErrorResponse('Could not get user info, please try again or sign out then in again.', 401));

  try {
    const decoded = JsonWebToken.verify(token, process.env.JWT_SECRET);
    const user = await User.deleteOne({_id: decoded.id});

    if (!user)
      return next(new ErrorResponse('Could not get user info, please try again or sign out then in again.', 404));

    return res.clearCookie('authToken').status(200).json({success: true});

  } catch (error) { return next(new ErrorResponse('Could not delete your account, please try again.', 401)); }
};


const sendToken = (user, statusCode, res) => {
  const token = user.getSignedToken();
  res.cookie('authToken', token, {
    expires: new Date(Date.now() + process.env.COOKIE_EXPIRES),
    sameSite: 'Lax',
    httpOnly: true,
    secure: true
  }).status(statusCode).json({success: true, user});
};