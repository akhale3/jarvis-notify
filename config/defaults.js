#!/usr/bin/env node
'use strict';

module.exports = {
  mail: function mailOptions(options) {
    return {
      recipients: options.recipients || '',
      template: options.body || '',
      email: options.email,
      password: options.password,
      from: options.name + ' <' + options.email + '>',
      subject: options.subject,
      transporter: 'smtps://' +
        options.email +
        ':' +
        options.password +
        '@smtp.gmail.com',
    };
  },
  slack: {
    webhook: 'https://hooks.slack.com/services/' +
      'T0RG6B6D7/B3058EYR3/fKTL89jZChbtoiSndOkwncvQ'
  }
};
