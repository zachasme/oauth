// OAuth 2.0 Token Revocation
// https://tools.ietf.org/html/rfc7009

/* TODO:

If the host of the token revocation endpoint can also be reached over
HTTP, then the server SHOULD also offer a revocation service at the
corresponding HTTP URI, but it MUST NOT publish this URI as a token
revocation endpoint.  This ensures that tokens accidentally sent over
HTTP will be revoked.
*/

/*
POST /revoke HTTP/1.1
Host: server.example.com
Content-Type: application/x-www-form-urlencoded
Authorization: Basic czZCaGRSa3F0MzpnWDFmQmF0M2JW

token=45ghiukldjahdnhzdauz&token_type_hint=refresh_token
*/

{
  validateClient(id, secret) {
    return true;
  }
  getToken() {

  }
}

class AuthorizationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'AuthorizationError';
  }
}

function revoke(ctx, next) {
  const { request } = ctx;
  const { access_token, token_type_hint } = request;

  validateClient();

  throw new AuthorizationError('invalid_request');
}
