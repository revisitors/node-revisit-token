# revisit.link tokens

This is the token manager for the http://revisit.link project.

## Usage

```js
var RevisitToken = require('revisit-token');
var rt = new RevisitToken();

// Generate a new uuid token
t.generate(function (err, tk) {
  console.log(tk);
});

// Custom tokens with custom ttl
t.putToken('wooohoo', 56000, function (err, tk) {
  console.log(tk);
});

// Check if a token still exists
rt.getToken(token, function (err, tk) {
  if (err) {
    // Token has expired
    console.log(err);
  }
});
```

## Api

### `RevisitToken([options])`

Constructor with optional options object, which takes the following properties:

* `db` *(string)* Path to db. Defaults to `'./db-tokens'`.
* `ttl` *(number | string)* TTL in milliseconds. Defaults to 24 hours.
* `frequency` *(number | string)* Interval in milliseconds how often the tokens should be checked. Defaults to 10 seconds.

### `.generate(cb)`

Generates an uuid token with a ttl set to the value set in the constructor. Calls back with `(err, token)`.

### `.putToken(token[, ttl], cb)`

As `generate()` but enables storing custom tokens with a custom ttl. Calls back with `(err, token)`.

* `token` *(string)* Token to store.
* `ttl` *(number | string)* Optional TTL in milliseconds. Defaults to the ttl value set in the constructor.

### `.getToken(token, cb)`

Retrieves a token. Calls back with `(err, token)`. If `err` is set the token has expired.

* `token` *(string)* Token to retrieve.

## License
BSD
