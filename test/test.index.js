'use strict';

process.env.NODE_ENV = 'test';

var should = require('should');
var child = require('child_process');

var RevisitToken = require('../index');
var rt = new RevisitToken({
  db: './test/db-token',
  ttl: 50,
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
      }, 100);
    });
  });

  it('should handle custom tokens', function (done) {
    var customToken = 'wearetheknightswhosay';
    rt.putToken(customToken, function (err, token) {
      should.exist(token);
      should.equal(token, customToken);

      setTimeout(function () {
        rt.getToken(token, function (err) {
          should.exist(err);
          done();
        });
      }, 100);
    });
  });

  it('should handle custom tokens with custom ttl', function (done) {
    var customToken = 'wearenolongertheknightswhosay';
    rt.putToken(customToken, 300, function (err, token) {
      should.exist(token);
      should.equal(token, customToken);

      setTimeout(function () {
        rt.getToken(customToken, function (err, token) {
          should.not.exist(err);
          should.equal(token, customToken);
          done();
        });
      }, 100);
    });
  });

});
