const express = require('express');
const app = express();
const volleyball = require('volleyball');
const path = require('path');
const bodyParser = require('body-parser');
const db = require('./db');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const dbStore = new SequelizeStore({ db: db });
const passport = require('passport');

dbStore.sync();

app.use(volleyball);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '../public')));

app.use(
  session({
    secret: process.env.SESSION_SECRET || 'secret',
    store: dbStore,
    resave: false,
    saveUninitialized: false
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  try {
    done(null, user.id);
  } catch (error) {
    done(error);
  }
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await db.models.user.findById(id);
    done(user);
  } catch (error) {
    done(error);
  }
});

app.use('/api', require('./api'));

const port = process.env.PORT || 3000;

db.sync().then(() => {
  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
});

app.get('*', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.use((err, req, res, next) => {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal Server Error');
});
