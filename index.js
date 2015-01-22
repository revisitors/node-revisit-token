'use strict';

var uuid = require('uuid');
var level = require('level');
var ttl = require('level-ttl');

var TTL_LIMIT = 1000 * 60 * 60 * 24; // 24 hours

var RevisitToken = function (options) {
  if (!(this instanceof RevisitToken)) {
    return new RevisitToken(options);
  }

  if (!options) {
    options = {};
  }

  var dbPath = options.db || './db-tokens';
  var defaultTTL = parseInt(options.ttl, 10) || TTL_LIMIT;
  var frequency = parseInt(options.frequency, 10) || 10000;

  var db = level(dbPath, {
    createIfMissing: true,
    valueEncoding: 'json'
  });

  db = ttl(db, { checkFrequency: frequency || 10000 });

  this.generate = function (next) {
    this.putToken(uuid.v4(), next);
  };

  this.putToken = function (token, ttl, next) {
    if (typeof ttl == 'function') {
      next = ttl;
      ttl = defaultTTL;
    }

    db.put('token!' + token, token, {
      ttl: ttl
    }, function (err) {
      if (err) {
        return next(err);
      }

      next(null, token);
    });
  };

  this.getToken = function (token, next) {
    db.get('token!' + token, function (err, token) {
      if (err || !token) {
        return next(new Error('No token found'));
      }

      next(null, token);
    });
  };
};

module.exports = RevisitToken;
