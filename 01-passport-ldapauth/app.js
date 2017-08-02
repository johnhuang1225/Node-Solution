/**
 * Created by a0801 on 2017/8/2.
 */
const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');
const ldapStrategy = require('passport-ldapauth');
const ldapConfig = require('../00-config/ldap')

const OPTS = {
    server: {
        url: ldapConfig.url,
        bindDN: ldapConfig.bindDN,
        bindCredentials: ldapConfig.bindCredentials,
        searchBase: ldapConfig.searchBase,
        searchFilter: ldapConfig.searchFilter
    }
    // usernameField: 'username',
    // passwordField: 'password'
}

const app = express();
passport.use(new ldapStrategy(OPTS));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());



// app.post('/login', passport.authenticate('ldapauth', {session: false}), function(req, res) {
//   res.send({status: 'ok'});
// });

app.post('/login', function (req, res, next) {
    passport.authenticate('ldapauth', { session: false }, function (err, user, info) {
        if (err) {
            return next(err); // will generate a 500 error
        }
        // Generate a JSON response reflecting authentication status
        if (!user) {
            return res.send({ success: false, message: 'authentication failed' });
        }
        return res.send({ success: true, message: 'authentication succeeded' });
    })(req, res, next);
});



app.listen(3001, function () {
    console.log(`Server started on port: 3001`);
})









