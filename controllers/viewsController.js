const User = require('../models/userModel');
const Lokacija = require('../models/pozicijaModel');

const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const { unsubscribe } = require('../app');

exports.getOverview = catchAsync(async (req, res, next) => {
  const users = await User.find();
  res.status(200).render('korisnici', {
    users,
  });
});
exports.getUserForm = catchAsync(async (req, res) => {
  res.status(200).render('create');
});
exports.createUser = catchAsync(async (req, res) => {
  console.log(req);
  let obj = {
    number: req.body.number,
  };
  await User.create(obj);
  const users = await User.find();

  res.status(200).render('index', {
    users,
  });
});
exports.getLocations = catchAsync(async (req, res, next) => {
  const user = await User.find({ number: req.params.id });
  res.status(200).render('lokacije', {
    lokacije: user[0].lokacije,
  });
});

exports.saveLocation = catchAsync(async (req, res, next) => {
  const user = await User.find({ number: req.params.id });
  const lokacija = await Lokacija.create({
    latitude: req.query.latitude,
    longitude: req.query.longitude,
  });

  user[0].lokacije.push(lokacija._id);
  console.log(user[0]);
  const newUser = await User.findByIdAndUpdate(user[0]._id, user[0], {
    new: true,
    runValidators: true,
  });
  res.status(200).render('lokacije', {
    lokacije: newUser.lokacije,
  });
});
