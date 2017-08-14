'use strict';


const express = require('express')
const app = express()
const request = require('request');


app.post('/check', function (req, res) {
    var city;
    if (req.params.city){
        city = req.params.city;
    }
    else
    {
        city = "london";
    }
    var yahooweather = 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22' + city + '%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys';
    request(yahooweather, function (error, response, body) {
        var weatherJson = {}
        if (error){
            response.status(500);
        }
        else {
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

        weatherJson = JSON.parse(body).query.results.channel.item.forecast[0];
        weatherJson.location = JSON.parse(body).query.results.channel.location;
        weatherJson.type = 0;
        weatherJson.speech =  "Yo it looks like today in " + weatherJson.location.city + " it will be a high of " +
            weatherJson.high + " and a low of " + weatherJson.low + ". " +
            getDressCode(weatherJson);
        weatherJson.displayText = weatherJson.speech;
        weatherJson.data = {};
        weatherJson.contextOut = [ ];
        weatherJson.source = " Our weather App";


        res.json(weatherJson);
    });
})





const server = app.listen(process.env.PORT || 3000, function () {

    const port = server.address().port ;
    console.log('Example app listening on port ' + port);
})


