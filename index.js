const config = require(`./environments/env.${process.env.CFG_ENV ? process.env.CFG_ENV : 'dev'}`);
const appFactory = require('./app');

const app = appFactory(config);
app.start();
