'use strict';


const request = require('request');


process.env.DEBUG = 'actions-on-google:*';


var signin;

// initialize the express application
var express = require("express"),
    app = express();

// initialize the Fitbit API client
var FitbitApiClient = require("fitbit-node"),
    client = new FitbitApiClient("228PW6", "fa58721e03216857b04f08e1e46ecfb8");

app.post('/check', function (req, res) {

    var signin;
    if (req.params.signin) {

        // redirect the user to the Fitbit authorization page
        app.get("/authorize", function (req, res) {
            // request access to the user's activity, heartrate, location, nutrion, profile, settings, sleep, social, and weight scopes
            res.redirect(client.getAuthorizeUrl('activity heartrate location nutrition profile settings sleep social weight', 'https://oauth-redirect.googleusercontent.com/r/application-757db'));
        });

        // handle the callback from the Fitbit authorization flow
        app.get("https://oauth-redirect.googleusercontent.com/r/application-757db/callback", function (req, res) {
            // exchange the authorization code we just received for an access token
            client.getAccessToken(req.query.code, 'https://oauth-redirect.googleusercontent.com/r/application-757db').then(function (result) {
                // use the access token to fetch the user's profile information
                client.get("/profile.json", result.access_token).then(function (results) {
                    res.send(results[0]);
                });
            }).catch(function (error) {
                res.send(error);
            });
        });
    }



    }



// launch the server
app.listen(3000);