#!/usr/bin/env node
'use strict';

var path = require('path');
var Promise = require('bluebird');

exports.route = {
  httpMethod: 'POST',
  path: 'notify',  // No leading slash
  callback: function callback(req, res, next) {
    var channels = [];

    if (req.params.channel) {
      channels = req.params.channel.split(/[\s,]+/);
    } else {
      channels.push('email');
    }

    Promise.all(channels.map(function mapCallback(channel) {
      var handler = require(path.resolve(__dirname, '.', 'lib', channel));

      return handler.logic(req.params)
      .then(function handlerRespond(response) {
        return response;
      })
      .catch(function handlerLogicCatch(response) {
        return response;
      });
    }))
    .then(function respond(responses) {
      res.send(responses);
      next();
    })
    .catch(function logicCatch(responses) {
      res.send(responses);
      next();
    });
  }
};
