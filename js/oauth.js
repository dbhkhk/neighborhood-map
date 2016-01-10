function nonce_generate() {
  return (Math.floor(Math.random() * 1e12).toString());
}

var yelp_url = 'https://api.yelp.com/v2/business/boulevard-cafe-daly-city';

  var parameters = {
    oauth_consumer_key: 'Yq5tVYmWeWxenLRN6gY-1g',
    oauth_token: 'iIhG_zwkm6hF77CXNNifSiohRlnmNfmZ',
    oauth_nonce: nonce_generate(),
    oauth_timestamp: Math.floor(Date.now()/1000),
    oauth_signature_method: 'HMAC-SHA1',
    callback: 'cb'             // This is crucial to include for jsonp implementation in AJAX or else the oauth-signature will be wrong.
  };
  
  var consumer_secret = 'Tld3ffMZxbToWbQ0d4MFDfibtvc',
      token_secret = 'WvM7Wj_ZJ5tKl4Uimb_Q6FXFauM';
      
  var encodedSignature = oauthSignature.generate('GET',yelp_url, parameters, consumer_secret, token_secret);
  parameters.oauth_signature = encodedSignature;

  var settings = {
    url: yelp_url,
    data: parameters,
    cache: true,                // This is crucial to include as well to prevent jQuery from adding on a cache-buster parameter "_=23489489749837", invalidating our oauth-signature
    dataType: 'jsonp',
    success: function(results) {
      // Do stuff with results
      console.log("SUCCCESS! %o", results);
    },
    error: function(error) {
      // Do stuff on fail
      console.log(error);
    }
  };

// Send AJAX query via jQuery library.
$.ajax(settings);


// get OAuth_signature

/*var httpMethod = 'GET',
    yelpURL = 'https://api.yelp.com/v2/business/boulevard-cafe-daly-city',
    parameters = {
        oauth_consumer_key : 'Yq5tVYmWeWxenLRN6gY-1g',
        oauth_token : 'iIhG_zwkm6hF77CXNNifSiohRlnmNfmZ',
        oauth_nonce : 'kllo9940pd9333jh',
        oauth_timestamp : Math.floor(Date.now() / 1000).toString(),
        oauth_signature_method : 'HMAC-SHA1',
        oauth_version : '1.0'
    },
    consumerSecret = 'Tld3ffMZxbToWbQ0d4MFDfibtvc',
    tokenSecret = 'WvM7Wj_ZJ5tKl4Uimb_Q6FXFauM',
    // generates a RFC 3986 encoded, BASE64 encoded HMAC-SHA1 hash
    encodedSignature = oauthSignature.generate(httpMethod, yelpURL, parameters, consumerSecret, tokenSecret),
    // generates a BASE64 encode HMAC-SHA1 hash
    signature = oauthSignature.generate(httpMethod, yelpURL, parameters, consumerSecret, tokenSecret,
        { encodeSignature: false});*/