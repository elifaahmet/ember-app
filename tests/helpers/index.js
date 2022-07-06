import {
  setupApplicationTest as upstreamSetupApplicationTest,
  setupRenderingTest as upstreamSetupRenderingTest,
  setupTest as upstreamSetupTest,
} from 'ember-qunit';

// This file exists to provide wrappers around ember-qunit's / ember-mocha's
// test setup functions. This way, you can easily extend the setup that is
// needed per test type.

function setupApplicationTest(hooks, options) {
  upstreamSetupApplicationTest(hooks, options);
}

function setupRenderingTest(hooks, options) {
  upstreamSetupRenderingTest(hooks, options);
  // Additional setup for rendering tests can be done here.
}

function setupTest(hooks, options) {
  upstreamSetupTest(hooks, options);

  // Additional setup for unit tests can be done here.
}

const generateJWTToken = (claims) => {
  const HMACSHA256 = (stringToSign, secret) => 'not_implemented';

  // The header typically consists of two parts:
  // the type of the token, which is JWT, and the signing algorithm being used,
  // such as HMAC SHA256 or RSA.
  const header = {
    alg: 'HS256',
    typ: 'JWT',
    kid: 'id-token-from-cookie',
  };
  const encodedHeaders = btoa(JSON.stringify(header));

  // The second part of the token is the payload, which contains the claims.
  // Claims are statements about an entity (typically, the user) and
  // additional data. There are three types of claims:
  // registered, public, and private claims.

  // the test user's user_hash
  const encodedPlayload = btoa(JSON.stringify(claims));

  // create the signature part you have to take the encoded header,
  // the encoded payload, a secret, the algorithm specified in the header,
  // and sign that.
  const signature = HMACSHA256(
    `${encodedHeaders}.${encodedPlayload}`,
    'mysecret'
  );
  const encodedSignature = btoa(signature);

  const jwt = `${encodedHeaders}.${encodedPlayload}.${encodedSignature}`;
  return jwt;
};

export {
  setupApplicationTest,
  setupRenderingTest,
  setupTest,
  generateJWTToken,
};
