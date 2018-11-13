# Node.js TDD / BDD / E2E tesing

Made easy with the right VS Code config. Just hit "F5" (if you're a Windows user) when the test file you wish to run is focused and see your isolated tests run.

Other classic testing options available in package.json via `npm test` or `npm run test:one`.

## Factory pattern

The factory pattern is the missing link between your average Node.js coder and a clever DI-aware developper.

### Don't

**my-service**

    const config = require('./config/test');
    const server = require('./mock/mock-server');

    module.exports = {
        start : server.start(config.port)
    }

**my-consumer.js**

    // Obtain pre-configured service
    const service = require('./my-service');

    // Start it
    service.start();

Why **don't**? Because it won't allow to "inject" the configuration nor actual server instance. Or mock. Or whatever.

**In a nutshell**

Factories enable the calling party to define the rules for the instance it requires.

### Do

**my-service.js**

    const singletonFactory(aConfig, aServer){
        return {
            start : aServer.start(aConfig.port)
        }
    }

    module.exports = singletonFactory;

**my-consumer.js**

    const config = require('./config/test');
    const server = require('./mock/mock-server');

    // Obtain factory
    const serviceFactory = require('./my-service');

    // Run factory with dependencies of your choice
    const service = serviceFactory(config, server);

    // Start resulting instance
    service.start();

Why **do** ? Because the calling party could set the config and server it wanted. The true power of factories come in play when you're developping tests.

## Dependency injection

DI is out of scope for this project. A best practice I recommend though since dependencies are easily mocked in case of testing, concerns are well decoupled and code interferences are kept minimal.

### In a nutshell

Sometimes mentionned as core element to IoC (inversion of control), it delegates the instance creation to a container, leaving calling parties agnostic of the instanciation mechanisms. Calling parties solely rely on a list of named dependencies. The container, be it prod, test, TDD, BDD, dev, (...) is the one to configure.

### In practice

See the [Trapezo](https://github.com/Dercetech/trapezo) npm package for best-practice DI library based on Wiretree (dependency management library).

`npm install --save trapezo`
