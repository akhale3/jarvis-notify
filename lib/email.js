#!/usr/bin/env node
'use strict';

var nodemailer = require('nodemailer');
var markdown = require('nodemailer-markdown').markdown;
var path = require('path');
var defaults = require(path.resolve(__dirname, '..', 'config', 'defaults'));

var sendMail = function sendMail(options) {
  var mail = defaults.mail(options);
  var transporter = nodemailer.createTransport(mail.transporter);
  transporter.use('compile', markdown());

  return transporter.sendMail({
    from: mail.from,
    to: mail.recipients,
    subject: mail.subject,
    markdown: mail.template
  });
};

exports.logic = sendMail;
