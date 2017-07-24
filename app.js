const db = require('./server/db');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const { User } = require('./server/db/models');
const passport = require('passport');

db.sync({ force: true })
  .then(() => {
    User.create({
      firstName: 'Anne',
      lastName: 'King',
      email: 'ann@ann.ann',
      password: 'fsa',   
    }).then(ok => console.log('Anne Marie created'));

    const app = require('./server');
    const dbStore = new SequelizeStore({ db: db });
    dbStore.sync();

    app.use(session({
      secret: process.env.SESSION_SECRET || 'a wildly insecure secret',
      store: dbStore,
      resave: false,
      saveUninitialized: false

    }));
    app.use(passport.initialize());
    app.use(passport.session());
    passport.serializeUser((user, done) => {
      try {
        done(null, user.id);
      } catch (err) {
        done(err);
      }
    });

    passport.deserializeUser((id, done) => {
      User.findById(id)
        .then(user => done(null, user))
        .catch(done);
    });
  });
