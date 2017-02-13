const testContext = require.context('../tests', true, /[sS]pec\.jsx?$/);
testContext.keys().forEach(testContext);

module.exports = testContext;
