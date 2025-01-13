const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
require('./models/user');
require('./services/passport');

const DB_URI = process.env.DB_URI || keys.mongoURI;
mongoose.connect(DB_URI)

const app = express();

const COOKIE_KEY = process.env.COOKIE_KEY || keys.cookieKey;

app.use(cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [COOKIE_KEY]
}));

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);