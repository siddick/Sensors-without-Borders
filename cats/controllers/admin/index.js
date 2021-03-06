'use strict';

var passport = require('../../lib/auth'),
    async = require('async'),
    _ = require('lodash'),
    download = require('../../lib/downloadForms'),
    db = require('../../models/db'),
    fields = "username sensorDeviceId description completedOn status karma";

module.exports = function (router) {

    router.get('/', passport.authenticate('basic'), function (req, res) {
        async.parallel({
            activities: function (next) {
                db.Activity.find({ status: 'Pending' }, fields, next);
            },
            message: function (next) {
                next(null, req.query.message);
            }
        }, function (e, data) {
            res.render('admin', data);
        });
    });

    router.get('/download', passport.authenticate('basic'), function (req, res) {
        download.saveForms(function () {
            res.redirect('/admin');
        });
    });

    router.get('/history', passport.authenticate('basic'), function (req, res) {
        async.parallel({
            activities: function (next) {
                db.Activity.find({ status: 'Completed' }, fields, next);
            }
        }, function (e, data) {
            res.render('history', data);
        });
    });

    router.get('/activities/:id/approve', passport.authenticate('basic'), function (req, res, next) {
        db.Activity.findById(req.params.id, function (err, doc) {
            if (err) {
                return next(err);
            }
            doc.status = 'Completed';
            doc.save(function (err) {
                if (err) {
                    return next(err);
                }
                res.redirect('/admin?message=Task Approved');
            });
        });
    });

    router.get('/activities/:id', function (req, res, next) {
        db.Activity.findById(req.params.id, function (err, doc) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.send(doc);
            }
        });
    });

    router.get('/activities/:id/reject', passport.authenticate('basic'), function (req, res, next) {
        db.Activity.findById(req.params.id, function (err, doc) {
            if (err) {
                return next(err);
            }
            doc.status = 'Rejected';
            doc.save(function (err) {
                if (err) {
                    return next(err);
                }
                res.redirect('/admin?message=Task Rejected');
            });
        });
    });

};
