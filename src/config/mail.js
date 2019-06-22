module.exports = {
  host: process.env.MAIL_HOST,
  port: process.env.PORT,
  secure: false,
  auth: {
    user: process.env.SENTRY_USER,
    pass: process.env.SENTRY_PASS
  }
}
