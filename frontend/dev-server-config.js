module.exports = {
  hostname: '0.0.0.0',
  port: '3000',
  webPath: __dirname,
  mockPath: __dirname,
  logLevel: 'debug',
  proxies: {
      '/user': {
          host: '127.0.0.1:8360',
      }
  }
}
