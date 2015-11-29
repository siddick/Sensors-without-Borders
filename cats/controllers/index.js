'use strict';

var passport = require('../lib/auth'),
    async = require('async'),
    _ = require('lodash'),
    db = require('../models/db'),
    fields = "sensorDeviceId description completedOn status karma";

// https://www.commcarehq.org/a/swb-opphack/api/v0.4/web-user/


module.exports = function (router) {

    router.get('/', passport.authenticate('basic'), function (req, res) {
        async.parallel({
            activities: function (next) {
                db.Activity.find({ status: 'Pending' }, fields, next);
            },
            history: function (next) {
                db.Activity.find({ status: 'Completed' }, fields, next);
            },
            karmaEarn: function (next) {
                db.Activity.aggregate([{
                    $match: { status: 'Completed' }
                }, {
                    $group: {
                        _id: {},
                        karma: { $sum: '$karma' }
                    }
                }], function (err, data) {
                    data = _.first(data);
                    next(err, data && data.karma);
                });
            },
            karmaPending: function (next) {
                db.Activity.aggregate([{
                    $match: { status: 'Pending' }
                }, {
                    $group: {
                        _id: {},
                        karma: { $sum: '$karma' }
                    }
                }], function (err, data) {
                    data = _.first(data);
                    next(err, data && data.karma);
                });
            },
            karmaInstallEarn: function (next) {
                db.Activity.aggregate([{
                    $match: { status: 'Completed', description: 'Sensor Device Deployment' }
                }, {
                    $group: {
                        _id: {},
                        karma: { $sum: '$karma' }
                    }
                }], function (err, data) {
                    data = _.first(data);
                    next(err, data && data.karma);
                });
            },
            karmaInstallationPending: function (next) {
                db.Activity.aggregate([{
                    $match: { status: 'Pending', description: 'Sensor Device Deployment' }, 
                }, {
                    $group: {
                        _id: {},
                        karma: { $sum: '$karma' }
                    }
                }], function (err, data) {
                    data = _.first(data);
                    next(err, data && data.karma);
                });
            },
            karmaMaintenanceEarn: function (next) {
                db.Activity.aggregate([{
                    $match: { status: 'Completed', description: 'Sensor Device Maintenance' }
                }, {
                    $group: {
                        _id: {},
                        karma: { $sum: '$karma' }
                    }
                }], function (err, data) {
                    data = _.first(data);
                    next(err, data && data.karma);
                });
            },
            karmaMaintenancePending: function (next) {
                db.Activity.aggregate([{
                    $match: { status: 'Pending', description: 'Sensor Device Maintenance' }, 
                }, {
                    $group: {
                        _id: {},
                        karma: { $sum: '$karma' }
                    }
                }], function (err, data) {
                    data = _.first(data);
                    next(err, data && data.karma);
                });
            },
        }, function (e, data) {
            res.render('index', data);
        });
    });

};
