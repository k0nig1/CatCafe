const express = require('express');
const ejsMate = require('ejs-mate');
const path = require('path'); // included in express
const mongoose = require('mongoose');
const methodOverride = require('method-override')
const { v4: uuid } = require('uuid');
const morgan = require('morgan');
const ExpressError = require('./utils/ExpressError');

const catRoutes = require('./routes/cats');

mongoose.connect('mongodb://localhost:27017/CatCafe');

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("[DEBUG] DATABASE CONNECTION OPEN!");
});

const app = express();

app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, 'public')));
//To parse form data in POST request body:
app.use(express.urlencoded({ extended: true }))
// To parse incoming JSON in POST request body:
app.use(express.json())
// To 'fake' put/patch/delete requests:
app.use(methodOverride('_method'))
// Views folder and EJS setup:
app.set('views', path.join(__dirname, 'views'))

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs')

// Routes

app.use('/cats', catRoutes);
app.get('/', (req, res) => {
    res.render('home');
})
app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404))
})
app.listen(3000, () => {
    console.log("[DEBUG] LISTENING ON PORT 3000!");
})
