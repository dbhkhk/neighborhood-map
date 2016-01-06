var httpMethod = 'GET',
    url = 'https://api.yelp.com/v2/search/?term=boulevard cafe&location=Daly City, CA',
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
    encodedSignature = oauthSignature.generate(httpMethod, url, parameters, consumerSecret, tokenSecret),
    // generates a BASE64 encode HMAC-SHA1 hash
    signature = oauthSignature.generate(httpMethod, url, parameters, consumerSecret, tokenSecret,
        { encodeSignature: false});