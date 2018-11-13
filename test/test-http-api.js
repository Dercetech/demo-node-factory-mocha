const chai = require('chai');
const should = chai.should();
const assert = chai.assert;
const expect = chai.expect;

// API testing
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const testENV = require('../environments/env.test');
const counterService = require('../app/services/counter-service');
const appFactory = require('../app');

// Local variable for subsequent tests
let app, server;

describe('HTTP API server', () => {
  before(done => {
    console.log('  INTRO This test shows actual E2E (end to end) testing');
    // Factory pattern rocks \,,/(◣_◢)\,,/
    app = appFactory(testENV);
    app.start().then(httpServer => {
      server = httpServer;
      done();
    });
  });

  beforeEach(done => {
    counterService.reset();
    done();
  });

  after(done => {
    app.stop();
    done();
  });

  describe('root API', () => {
    it('should respond', done => {
      chai
        .request(server)
        .get('/')
        .then(res => {
          res.text.should.equal('Hello Starter Pack!');
          done();
        });
    });
  });

  describe('counter routes', () => {
    it('should 404 upon GET /increment and /decrement', done => {
      chai
        .request(server)
        .get('/increment')
        .then(res => {
          // Set a breakpoint here
          res.status.should.equal(404);
        })
        .then(() => chai.request(server).get('/decrement'))
        .then(res => res.status.should.equal(404))
        .then(() => done());
    });

    it('should properly handle increment, count and decrement', done => {
      chai
        .request(server)
        .get('/count')
        .then(res => res.body.count.should.equal(0))
        .then(() => chai.request(server).put('/increment'))
        .then(res => res.body.count.should.equal(1))
        .then(() => chai.request(server).put('/decrement'))
        .then(res => res.body.count.should.equal(0))
        .then(() => done());
    });
  });
});
