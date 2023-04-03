export default {
  database: {
    url: process.env.DATABASE_URL,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    name: process.env.DB_NAME,
  },
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
  jwt: {
    secret: process.env.SECRET,
  },
  mail: {
    smtp: {
      host: process.env.SMTP_HOST,
      port: process.env.MAIL_PORT,
    },
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
    service: process.env.MAIL_SERVICE,
    from: process.env.FROM_EMAIL,
  },
};
