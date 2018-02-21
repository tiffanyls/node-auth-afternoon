const express = require('express');
const session = require('express-session');
const passport = require('passport');

const strategy = require(`${__dirname}/strategy`);
const {clientID} = require('../config');

const request = require('request');

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
});

app.get('/login', passport.authenticate('auth0', {
  successRedirect: 'http://localhost:3000/followers',
  failureRedirect: '/login',
  failureFlash: true,
  connection: 'github'
}));

app.get('/followers', (req, res, next) =>{
  if (req.user) {
    const FollowersRequest = {
      url: `https://api.github.com/users/${req.user.nickname}/followers`,
      headers: {
        'User-Agent': clientID
      }
    };
    request(FollowersRequest, (error, response, body)=>{
      res.status(200).send(body);
      console.log(body)
    });
  }else {
      res.redirect('/login');
    }
  }
);

const port = 3000;
app.listen( port, () => { console.log(`Server listening on port ${port}`); } );