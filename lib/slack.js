#!/usr/bin/env node
'use strict';

var request = require('request-promise');
var Promise = require('bluebird');
var path = require('path');
var defaults = require(path.resolve(__dirname, '..', 'config', 'defaults'));

var sendSlackMessage = function sendSlackMessage(options) {
  var slack = defaults.slack;
  request.post({
    url: slack.webhook,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      text: options.body
    })
  })
  .then(function requestCallback(res) {
    return new Promise(function resolvePromise(resolve) {
      resolve(res);
    });
  })
  .catch(function requestError(err) {
    return new Promise(function rejectPromise(resolve, reject) {
      reject(err);
    });
  });
};

exports.sendSlackMessage = sendSlackMessage;
