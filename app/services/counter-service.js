let internalState = {
  count: 0
};

function increment() {
  internalState.count++;
}

function decrement() {
  internalState.count--;
}

function getCount() {
  return internalState.count;
}

function reset() {
  internalState.count = 0;
}

module.exports = { getCount, increment, decrement, reset };
