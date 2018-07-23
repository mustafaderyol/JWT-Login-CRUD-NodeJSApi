let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

// Rooter
let indexRouter = require('./routes/index');
let authenticateRouter = require('./routes/authenticate');
let userRouter = require('./routes/user');

let app = express();

// Error Messages
const errorMessageTR = require('./error_messages/tr');
const errorMessageENG = require('./error_messages/eng');
if (true) { // TR gelirse
    app.set('errorMessages', errorMessageTR.messageList);
} else { // ENG gelirse
    app.set('errorMessages', errorMessageENG.messageList);
}

// Db connection
const database = require('./helpers/database')();

// Config
const config = require('./config');
app.set('api_secret_key', config.api_secret_key);

// Middleware
const verifyToken = require('./middleware/verify-token');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Route Configuration
app.use('/', indexRouter);
app.use('/auth', authenticateRouter);
app.use('/api', verifyToken);
app.use('/api/user', userRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.json({
        success: false,
        message: err,
        data: null
    });
});

module.exports = app;
