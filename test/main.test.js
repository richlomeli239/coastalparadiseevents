const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');

// Mock global objects
global.window = {
  scrollTo: () => {}
};
global.document = {
  addEventListener: () => {},
  getElementById: () => null,
  querySelectorAll: () => [],
  querySelector: () => null,
};

// Evaluate the client-side code in the global scope
const code = fs.readFileSync(path.join(__dirname, '../assets/js/main.js'), 'utf8');
eval(code);

test.describe('closePaymentModal', () => {
  test.it('removes "active" class from the payment modal if it exists', () => {
    let removedClass = null;

    // Mock getElementById just for this test
    global.document.getElementById = (id) => {
      if (id === 'paymentModal') {
        return {
          classList: {
            remove: (className) => {
              removedClass = className;
            }
          }
        };
      }
      return null;
    };

    closePaymentModal();
    assert.strictEqual(removedClass, 'active');
  });

  test.it('does not throw an error if the payment modal does not exist', () => {
    // Mock getElementById to return null
    global.document.getElementById = (id) => null;

    assert.doesNotThrow(() => {
      closePaymentModal();
    });
  });
});
