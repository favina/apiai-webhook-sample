'use strict';

process.env.DEBUG = 'actions-on-google:*';
let Assistant = require('actions-on-google').ApiAiAssistant;


// require basic auth
var auth = require('basic-auth');

// initialize the express application
var express = require("express"),
    app = express();

// initialize the Fitbit API client
var FitbitApiClient = require("fitbit-node"),
    client = new FitbitApiClient("");

app.post('/check', function (req, res) {
    // check 
    var user = auth(req)
    if (user.name === config.auth.user && user.pass === config.auth.password) {
        const assistant = new Assistant({request: req, response: res});

        // fulfill action business logic
        function responseHandler (assistant) {
            assistant.tell('We swear to serve the master of the Precious.');
        }

        assistant.handleRequest(responseHandler);

    } else {
        console.log('User not autenticated');
        res.send('Bad user/pass');
    }
});


const server = app.listen(process.env.PORT || 3000, function () {

    const port = server.address().port ;
    console.log('Example app listening on port ' + port);
})
// launch the server
app.listen(3000);

