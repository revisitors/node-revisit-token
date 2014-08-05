'use strict';

var uuid = require('uuid');
var level = require('level');
var ttl = require('level-ttl');

var TTL_LIMIT = 1000 * 60 * 60 * 24; // 24 hours

var RevisitToken = function (options) {
  if (!options) {
    options = {};
  }

  var dbPath = options.db || './db-tokens';
  var limit = parseInt(options.ttl, 10) || TTL_LIMIT;
  var frequency = parseInt(options.frequency, 10) || 10000;

  var db = level(dbPath, {
    createIfMissing: true,
    valueEncoding: 'json'
  });

  db = ttl(db, { checkFrequency: frequency || 10000 });

  this.generate = function (next) {
    var token = uuid.v4();

    db.put('token!' + token, token, {
      ttl: limit
    }, function (err) {
      if (err) {
        next(err);
        return;
      }

      next(null, token);
    });
  };

  this.getToken = function (token, next) {
    db.get('token!' + token, function (err, token) {
      if (err || !token) {
        next(new Error('No token found'));
        return;
      }
      console.log(err)
      next(null, token);
    });
  };
};

module.exports = RevisitToken;
