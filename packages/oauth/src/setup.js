const options = {
  // GET /authorize?...
  authorizationCode() {
    // Authorization codes MUST be short lived and single-use
    // A maximum authorization code lifetime of 10 minutes is
    // RECOMMENDED. 
    return 'YXV0aG9yaXphdGlvbkNvZGU=';
  },
  // GET /token?
  refreshToken() {
    // TODO: rotation in lib?
    return '';
  }
  accessToken() {
    //
    return '';
  }
  validateRedirectURI(id, redirectURI) {
    return (id == CLIENT.id && redirectURI === CLIENT.redirectURI)
  }
};
