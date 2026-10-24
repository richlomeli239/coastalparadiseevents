const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');

// Basic DOM Mocks
global.document = {
  addEventListener: () => {}
};

// Load the script
const scriptContent = fs.readFileSync(path.join(__dirname, '../main.js'), 'utf-8');
eval(scriptContent);

test('closePaymentModal', async (t) => {
  await t.test('removes active class when modal exists', () => {
    let removedClass = null;
    const mockModal = {
      classList: {
        remove: (cls) => {
          removedClass = cls;
        }
      }
    };

    const originalGetElementById = global.document.getElementById;
    global.document.getElementById = (id) => {
      if (id === 'paymentModal') return mockModal;
      return null;
    };

    closePaymentModal();
    assert.strictEqual(removedClass, 'active');

    global.document.getElementById = originalGetElementById;
  });

  await t.test('does not throw when modal does not exist', () => {
    const originalGetElementById = global.document.getElementById;
    global.document.getElementById = (id) => {
      return null;
    };

    assert.doesNotThrow(() => {
      closePaymentModal();
    });

    global.document.getElementById = originalGetElementById;
  });
});
