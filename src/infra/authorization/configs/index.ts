export default {
  googleAuth: {
    web: {
      clientId: process.env.OAUTH_CLIENT_ID,
      projectId: process.env.OAUTH_PROJECT_ID,
      authUri: process.env.OAUTH_AUTH_URI,
      tokenUri: process.env.OAUTH_TOKEN_URI,
      auth_provider_x509_cert_url: process.env.OAUTH_CERT_URL,
      clientSecret: process.env.OAUTH_CLIENT_SECRET,
      redirectUri: process.env.REDIRECT_URI,
    },
  },
};
