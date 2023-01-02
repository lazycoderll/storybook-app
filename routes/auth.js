const express = require('express')
const passport = require('passport')
const { deleteOne } = require('../models/User')
const router = express.Router()

// auth with google
//route get /auth/google
router.get('/google', passport.authenticate('google', { scope: ['profile'] }))

// auth callback
//get /auth/google/callback
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }),
(req, res) => {
    res.redirect('/dashboard')
}
)

// logout user

router.get('/logout', function(req, res, next) {
    req.logout(function(err) {
      if (err) { 
        return next(err); 
        }
      res.redirect('/');
    });
  });

module.exports = router