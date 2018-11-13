const express = require('express');

function apiFactory(counterService) {
  const app = express();

  app.get('/', (req, res) => res.send('Hello Starter Pack!'));

  app.put('/increment', (req, res) => {
    counterService.increment();
    const count = counterService.getCount();
    res.json({ count });
  });

  app.put('/decrement', (req, res) => {
    counterService.decrement();
    const count = counterService.getCount();
    res.json({ count });
  });

  app.get('/count', (req, res) => {
    const count = counterService.getCount();
    res.json({ count });
  });

  return app;
}

module.exports = apiFactory;
