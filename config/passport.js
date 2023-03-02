const GoogleStrategy = require('passport-google-oauth20').Strategy
const mongoose = require('mongoose')
const User = require('../models/User')


//google strategy
module.exports = function(passport) {
    passport.use(new GoogleStrategy({
        clientID: '724869068922-g86gn6c3l9tvgfdpf14qf5junmatbu1m.apps.googleusercontent.com',
        clientSecret: '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',
        callbackURL: 'http://writeestoriess.onrender.com/auth/google/callback'
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