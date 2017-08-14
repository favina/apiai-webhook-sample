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

    const app = new ApiAiApp({ request, response });

    if (fitbit == "fitbit" && fitbit == !null){

        // fulfill action business logic
        function responseHandler (assistant) {
            app.tell({speech: 'Great see you at your appointment!',
                displayText: 'Great, we will see you on '
                + app.getDateTime().date.month
                + '/' + app.getDateTime().date.day
                + ' at ' + app.getDateTime().time.hours
                + (app.getDateTime().time.minutes || '')});
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




