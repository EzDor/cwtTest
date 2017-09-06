var db = require('./db');
var uuid = require('node-uuid');

var FlightManager = function () {

    var TABLE = 'flight';

    this.getFlightById = function (id, callback) {
        if (!id) {
            return callback('Error flight id in no found');
        }
        db.getRecord(TABLE, id, function (err, record) {
            if(err){
                return callback(err);
            }
            callback(record);
        });
    };

    this.getFlightTable = function (callback) {

        db.getTable(TABLE, function (err, record) {
            if(err){
                return callback(err);
            }
            callback(record);
        });
    };


    this.insertFlight = function (flightData, callback) {
        var flight = {
            id: flightData.id, //here should be a generated id
            countryOrigin: flightData.countryOrigin,
            countryDest: flightData.countryDest,
            fare: flightData.fare,
            isActive: true
        };

        var isDomnesticFlight = flight.countryOrigin === flight.countryDest;

        db.save(flight, TABLE, function (err, record) {
            if(err){
                return callback(err);
            }
            callback(record);
        });
    };

    this.deleteFlight = function (flightId, callback) {
        db.getRecord(TABLE, flightId, function (err, flight) {
            if (err) {
                return callback(err);
            }

            flight.isActive = false;

            db.save(flight, TABLE, function (err, record) {
                if(err){
                    return callback(err);
                }
                callback(record);
            });
        });
    };

};

module.exports = FlightManager;


