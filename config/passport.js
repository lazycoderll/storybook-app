const GoogleStrategy = require('passport-google-oauth20').Strategy
const mongoose = require('mongoose')
const User = require('../models/User')


//google strategy
module.exports = function(passport) {
    passport.use(new GoogleStrategy({
        clientID: '376283452364-efdlk73csd7n1852re0maefb0rhte8bc.apps.googleusercontent.com',
        clientSecret: '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',
        callbackURL: '/auth/google/callback'
    },    
    async (accessToken, refreshToken, profile, done) => {
        const newUser = {
            googleId: profile.id,
            displayName: profile.displayName,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            image: profile.photos[0].value
        }

        try {
            let user = await User.findOne({ googleId: profile.Id })

            if (user) {
                done(null, user)
            } else {
                user = await User.create(newUser)
                done(null, user)
            }
        } catch (err) {
            console.error(err)
        }

    }))

    passport.serializeUser((user, done) => {
        done(null, user.id)
    })
    passport.deserializeUser((id, done) => {
        User.findById(id,(err, user) => done(err, user))
    })
}