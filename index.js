'use strict';

process.env.DEBUG = 'actions-on-google:*';
let Assistant = require('actions-on-google').ApiAiAssistant;
let express = require('express');


let app = express();

// require basic auth
var auth = require('basic-auth');

app.post('/', function (req, res) {
    // check autentication
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