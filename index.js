#!/usr/bin/env node
'use strict';

var path = require('path');
var mail = require(path.resolve(__dirname, '.', 'lib', 'mail'));
var slack = require(path.resolve(__dirname, '.', 'lib', 'slack'));
var Promise = require('bluebird'); // eslint-disable-line

exports.route = {
  httpMethod: 'POST',
  path: 'notify',  // No leading slash
  callback: function callback(req, res, next) {
    if (!req.params.channel || req.params.channel.indexOf('email') > -1) {

      // Email integration
      mail.sendMail(req.params)
      .then(function respond(info) {
        res.send(info);
        next();
      })
      .catch(function sendMailCatch(error) { // eslint-disable-line
        // TODO: Log error
        res.send(error);
        next();
      });
    } else if (req.params.channel.indexOf('slack') > -1) {

      // Slack API integration
      slack.sendSlackMessage(req.params)
      .then(function respond(info) {
        res.send(info);
        next();
      })
      .catch(function sendSlackMessageCatch(error) { // eslint-disable-line
        // TODO: Log error
        res.send(error);
        next();
      });
    }
  }
};
