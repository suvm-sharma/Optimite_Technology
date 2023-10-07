const jwt = require('jsonwebtoken');
const User = require('../model/userModel');
const Task = require('../model/taskModel');

const signToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.register = async (req, res) => {
  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    });

    const token = signToken(newUser._id);

    res.status(201).json({
      status: 'success',
      token,
      data: {
        newUser,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1) Check if email and password exist

    if (!email || !password) {
      res.status(400).json({
        status: 'fail',
        message: 'please provide a valid email or password !!',
      });
    }

    // 2) if User exists and password is correct
    let user = await User.findOne({ email: email }).select('+password');

    // correctPassword is an instance method so, it will available to all the user document
    if (!user || !(await user.correctPassword(password, user.password))) {
      res.status(401).json({
        status: 'fail',
        message: 'Incorrect email or password',
      });
    }

    // if everything is ok, send token to client
    const token = signToken(user._id);
    res.status(200).json({
      status: 'success',
      token,
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }
};

exports.protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  // if token(JWT) will not send along with req, this Error will trigger
  if (!token) {
    throw Error('You are not logged in! please login to get access');
  }

  // 2) Verification token
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.id = decoded.id;

  next();
};
