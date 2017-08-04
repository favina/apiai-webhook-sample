const express = require('express')
const app = express()
const request = require('request');


    if (app.getSignInStatus() === app.SignInStatus.OK) {
        let accessToken = app.getUser().accessToken;
        // access account data with the token
    } else {
        app.tell('You need to sign-in before using the app.');
    }
