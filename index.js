const express = require('express');
const session = require('express-session');
const passport = require('passport');

const strategy = require(`${__dirname}/strategy`);

const app = express();

app.use( session({
  secret: '@nyth!ng y0u w@nT',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(strategy);

passport.serializeUser((user,done) => {
  done(null,user);
});

passport.deserializeUser((user,done) =>{
  done(null,user);
})

const port = 3000;
app.listen( port, () => { console.log(`Server listening on port ${port}`); } );