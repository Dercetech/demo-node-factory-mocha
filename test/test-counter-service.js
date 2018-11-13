const chai = require('chai');
const should = chai.should();
const assert = chai.assert;
const expect = chai.expect;

const counterService = require('../app/services/counter-service');

describe('Counter service', () => {
  before(done => {
    console.log('  INTRO This test shows service test in isolation');
    done();
  });

  beforeEach(done => {
    counterService.reset();
    done();
  });

  after(done => done());

  describe('Internal counter', () => {
    it('should increment upon request', done => {
      // First style: Assert (classic TDD)
      assert(counterService.getCount() === 0, 'initial count should be 0');
      counterService.increment();
      assert(counterService.getCount() === 1, 'intermediate count should be 1');
      counterService.increment();
      assert(counterService.getCount() === 2, 'final initial count should be 2');
      done();
    });

    it('should decrement upon request', done => {
      // Second style: Should (BDD - behavior driven development)
      counterService.increment();
      counterService.increment();
      counterService.getCount().should.equal(2);
      counterService.decrement();
      // Third style: Expect (BDD)
      expect(counterService.getCount()).to.be.equal(1);
      done();
    });
  });
});
