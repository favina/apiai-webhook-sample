const express = require('express')
const app = express()
const request = require('request');


process.env.DEBUG = 'actions-on-google:*';
let Assistant = require('actions-on-google').ApiAiAssistant;
let express = require('express');


let app = express();

app.post('/check', function (req, res) {
    // noinspection JSAnnotator
    var fitbit = 'fitbit'(req);
    const assistant = new Assistant({request: req, response: res});

    if (fitbit == "fitbit" && fitbit == !null){

        // fulfill action business logic
        function responseHandler (assistant) {
            assistant.tell('We swear to serve the master of the Precious.');
        }

        assistant.handleRequest(responseHandler);

    } else {

        res.send('Bad Request');
    }

});




const server = app.listen(process.env.PORT || 3000, function () {

    const port = server.address().port ;
    console.log('Example app listening on port ' + port);
})




