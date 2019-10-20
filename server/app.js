require('dotenv').config();

const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const express      = require('express');
const favicon      = require('serve-favicon');
const hbs          = require('hbs');
const mongoose     = require('mongoose');
const logger       = require('morgan');
const path         = require('path');
const cors         = require('cors');
const session    = require("express-session");
const MongoStore = require('connect-mongo')(session);
const flash      = require("connect-flash");
    

mongoose
  //local mongo
  // .connect('mongodb://localhost/gang', {useNewUrlParser: true})
  //Atlas
  .connect(`${process.env.MONGO_URL}`, {useNewUrlParser: true})
  .then(x => {
    // console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();

//Cors setup
var whitelist = [
  `${process.env.MONGO_URL}`,
  `${process.env.REACT_URL}`
  // "http://localhost:3000"
];
var corsOptions = {
  origin: function(origin, callback){
      var originIsWhitelisted = whitelist.indexOf(origin) !== -1;
      callback(null, originIsWhitelisted);
  },
  credentials: true
};
app.use(cors(corsOptions));

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express View engine setup

app.use(require('node-sass-middleware')({
  src:  path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));
      

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));


hbs.registerHelper('ifUndefined', (value, options) => {
  if (arguments.length < 2)
      throw new Error("Handlebars Helper ifUndefined needs 1 parameter");
  if (typeof value !== undefined ) {
      return options.inverse(this);
  } else {
      return options.fn(this);
  }
});
  

// default value for title local
app.locals.title = 'Jakku';


// Enable authentication using session + passport
app.use(session({
  secret: 'irongenerator',
  resave: true,
  saveUninitialized: true,
  store: new MongoStore( { mongooseConnection: mongoose.connection })
}))
app.use(flash());
require('./passport')(app);
    

// const index = require('./routes/index');
// app.use('/', index);

const authRoutes = require('./routes/auth.routes');
app.use('/', authRoutes);
const createRoutes = require('./routes/create.routes');
app.use('/create', createRoutes);
const displayRoutes = require('./routes/display.routes');
app.use('/display', displayRoutes);
const editRoutes = require('./routes/edit.routes');
app.use('/edit', editRoutes);
const deleteRoutes = require('./routes/delete.routes');
app.use('/delete', deleteRoutes);
const userRoutes = require('./routes/user.routes');
app.use('/user', userRoutes);

// const googleRoutes = require('./routes/google');
// app.use('/', googleRoutes);
app.use((req, res, next) => {
     res.sendFile(__dirname + `/public/index.html`);
    });    

module.exports = app;
