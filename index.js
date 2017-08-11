const express = require('express')
const app = express()
const request = require('request');

var google = require('googleapis');

app.post('/calendar', function (req, res) {

    var calendarId;
    if (req.params.calendarId){
        calendarId = req.params.calendarId;

    }
    else
    {
        calendarId = 'en.uk#holiday@group.v.calendar.google.com';
    }

    var cal = 'https://www.googleapis.com/calendar/v3/calendars/'+ calendarId +'/events';


    request(cal, function (error, response) {
        var events = {}
        if (error){
            response.status(500);
        }
        else {

            events.type = 0;
            events.speech = "your events";
            events.displayText = events.speech;
            events.data = {};
            events.contextOut = [ ];
            events.source = " Our weather App";

            res.json(events);

        }
    });


});

function listEvents() {
    var calendar = google.calendar('v3');
    calendar.events.list({
        auth: auth,
        calendarId: 'primary',
        timeMin: (new Date()).toISOString(),
        maxResults: 10,
        singleEvents: true,
        orderBy: 'startTime'
    }, function(err, response) {
        if (err) {
            console.log('The API returned an error: ' + err);
            return;
        }
        var events = response.items;
        if (events.length == 0) {
            console.log('No upcoming events found.');
        } else {
            console.log('Upcoming 10 events:');
            for (var i = 0; i < events.length; i++) {
                var event = events[i];
                var start = event.start.dateTime || event.start.date;
                console.log('%s - %s', start, event.summary);
            }
        }
    });
}

const server = app.listen(process.env.PORT || 3000, function () {

    const port = server.address().port ;
    console.log('Example app listening on port ' + port);
})