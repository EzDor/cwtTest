var exit = require('exit');
var http = require('http');


var insertFlight = function () {
    var flight = JSON.stringify({
        id:3,
        countryOrigin: "USA",
        countryDest: "HG",
        fare: 1000
    });

    var options = {
        hostname: 'localhost',
        port: 3000,
        path: '/api/flight',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': flight.length
        }
    };
    var req = http.request(options, function(res) {
        console.log('Status: ' + res.statusCode);
        console.log('Headers: ' + JSON.stringify(res.headers));
        res.setEncoding('utf8');
        res.on('data', function (body) {
            console.log('Body: ' + body);
        });
    });
    req.on('error', function(e) {
        console.log('problem with request: ' + e.message);
    });
// write data to request body
    req.write(flight);
    req.end();
};

insertFlight();