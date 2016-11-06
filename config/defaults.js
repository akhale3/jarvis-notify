#!/usr/bin/env node
'use strict';

module.exports = {
  mail: function mailOptions(options) {
    return {
      recipients: options.recipients || '',
      template: options.body || '',
      email: process.env.MAIL_ADDRESS,
      password: process.env.MAIL_PASSWORD,
      from: process.env.MAIL_NAME + ' <' + process.env.MAIL_ADDRESS + '>',
      subject: options.subject || process.env.MAIL_SUBJECT,
      transporter: 'smtps://' +
        process.env.MAIL_ADDRESS +
        ':' +
        process.env.MAIL_PASSWORD +
        '@smtp.gmail.com',
    };
  }
};
