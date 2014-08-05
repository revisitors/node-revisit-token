# revisit.link tokens

This is the token manager for the http://revisit.link project.

## Usage

    var RevisitToken = require('../index');
    var rt = new RevisitToken();

    // Generate a new token
    rt.generate(function (err, tk) {
      console.log(tk);
    });

    // Check if a token still exists
    rt.getToken(token, function (err, tk) {
      if (err) {
        // Token has expired
        console.log(err);
      }
    });
  });
