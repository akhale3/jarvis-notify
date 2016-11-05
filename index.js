exports.route = {
  httpMethod: 'POST',
  path: 'notify',  // No leading slash
  callback: function callback(req, res, next) {
    res.send('Notification dictionary ' + req.params.dictionary);
    next();
  }
};
