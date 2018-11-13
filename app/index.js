const counterService = require('./services/counter-service');
const apiFactory = require('./api/root');

function appFactory(config) {
  // Create an HTTP API
  const httpAPI = apiFactory(counterService);
  let server;

  function start() {
    return new Promise((resolve, reject) => {
      server = httpAPI.listen(config.api.port, () => {
        console.log(`[app] listening on port ${config.api.port}!`);
        resolve(server);
      });
    });
  }

  function stop() {
    console.log('[app] closing http server...');
    server.close(() => console.log('[app] server stopped'));
  }
  return { start, stop };
}

module.exports = appFactory;
