// initialize the express application
var express = require("express"),
    app = express();

// initialize the Fitbit API client
var FitbitApiClient = require("fitbit-node"),
    client = new FitbitApiClient("228PNR", "1e3237f1d5159110fdf1db8000f70a83");

// redirect the user to the Fitbit authorization page
app.get("/authorize", function (req, res) {
    // request access to the user's activity, heartrate, location, nutrion, profile, settings, sleep, social, and weight scopes
    res.redirect(client.getAuthorizeUrl('activity heartrate location nutrition profile settings sleep social weight', 'http://localhost:3000/'));
});

// handle the callback from the Fitbit authorization flow
app.get("/callback", function (req, res) {
    // exchange the authorization code we just received for an access token
    client.getAccessToken(req.query.code, 'http://localhost:3000/').then(function (result) {
        // use the access token to fetch the user's profile information
        client.get("/profile.json", result.access_token).then(function (results) {
            res.send(results[0]);
        });
    }).catch(function (error) {
        res.send(error);
    });
});

// launch the server
app.listen(3000);