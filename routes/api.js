var express = require('express');
var router = express.Router();
var FlightManager = require('../lib/flightManager');

var flightManager = new FlightManager();

router.get('/flight/:id', function (req, res, next) {
    flightManager.getFlightById(req.params.id, function (data) {
        res.render('postTemplate', {data: data});
    });
});

router.get('/flight', function (req, res, next) {
    flightManager.getFlightTable(function (data) {
        res.render('postTemplate', {data: data});
    });
});

router.post('/flight', function (req, res, next) {
    flightManager.insertFlight(req.body, function (data) {
        res.render('postTemplate', {data: data});
    });
});

router.get('/flight/:id', function (req, res, next) {
    flightManager.deleteFlight(req.params.id, function (data) {
        res.render('postTemplate', {data: data});
    });
});

module.exports = router;
