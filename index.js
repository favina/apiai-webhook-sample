const express = require('express')
const app = express()
const request = require('request');

var date;

app.post('/calendar', function (req, res) {

    if (req.params.date){
        date = req.params.date;
    }else{
        date = "2018-05-07";
    }
    var events = 'https://www.googleapis.com/calendar/v3/calendars/en.uk%23holiday%40group.v.calendar.google.com/events?maxResults=10&key=AIzaSyD6gcqMMXeOzBAxg-05yDGaED4G4cKd0l4';

    request(events, function (error, response, body) {
        var eventsJson = {}

        if (error){
            response.status(500);
        }
        else {
           // eventsJson = JSON.parse(body).items[0].start.date;
            eventsJson.events = JSON.parse(body).items[0].summary;
            eventsJson.type = 0;
            eventsJson.speech =  "You're events as follows" + eventsJson.events;
            eventsJson.displayText = eventsJson.speech;
            eventsJson.data = {};
            eventsJson.contextOut = [ ];
            eventsJson.source = " My App";

            res.json(eventsJson);

        }

    });

});



const server = app.listen(process.env.PORT || 3000, function () {

    const port = server.address().port ;
    console.log('Example app listening on port ' + port);
})