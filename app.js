const path = require('path');
const express = require('express');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const viewRouter = require('./routes/viewRoutes');
const hbs = require('hbs');
const app = express();

const publicDirectoryPath = path.join(__dirname, './public');
const viewsPath = path.join(__dirname, './views');
const partialsPath = path.join(__dirname, './partials');

//SETUP ZA HANDLEBARS
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);
hbs.registerHelper('ifEquals', function (arg1, arg2, options) {
  return arg1 == arg2 ? options.fn(this) : options.inverse(this);
});
hbs.registerHelper('ifDoubleEquals', function (arg1, arg2, arg3, options) {
  return arg1 != arg2 && arg1 != arg3
    ? options.fn(this)
    : options.inverse(this);
});
hbs.registerHelper('ifGreaterThan', function (arg1, arg2, options) {
  return arg1 > arg2 ? options.fn(this) : options.inverse(this);
});

// 1) GLOBAL MIDDLEWARES
// Serving static files
app.use(express.static(path.join(__dirname, 'public')));

// Set security HTTP headers
app.use(helmet());

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// 3) ROUTES
app.use('/', viewRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
