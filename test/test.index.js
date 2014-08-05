'use strict';

process.env.NODE_ENV = 'test';

var should = require('should');
var child = require('child_process');

var RevisitToken = require('../index');
var rt = new RevisitToken({
  db: './test/db-token',
  ttl: 500,
  frequency: 1
});

describe('RevisitToken', function () {
  after(function () {
    child.exec('rm -rf ./test/db*');
  });

  it('should create a new token and expire it', function (done) {
    rt.generate(function (err, token) {
      should.exist(token);

      setTimeout(function () {
        rt.getToken(token, function (err) {
          should.exist(err);
          done();
        });
      }, 1500);
    });
  });
});
