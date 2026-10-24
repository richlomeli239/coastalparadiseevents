const fs = require('fs');
const path = require('path');

const scriptPath = path.resolve(__dirname, '../assets/js/main.js');
const scriptContent = fs.readFileSync(scriptPath, 'utf-8');

describe('openPaymentModal', () => {
  let openPaymentModal;

  beforeEach(() => {
    document.body.innerHTML = `
      <div id="paymentModal"></div>
    `;

    // Extract the function definition and assign it to our scoped variable
    const functionMatch = scriptContent.match(/function openPaymentModal\(\) \{[\s\S]*?\n\}/);
    if (functionMatch) {
      // Evaluate the function definition directly to get a reference to it
      openPaymentModal = eval('(' + functionMatch[0] + ')');
    } else {
      throw new Error('Could not find openPaymentModal function');
    }
  });

  test('adds the "active" class to the element with id "paymentModal"', () => {
    const modal = document.getElementById('paymentModal');
    expect(modal.classList.contains('active')).toBe(false);

    openPaymentModal();

    expect(modal.classList.contains('active')).toBe(true);
  });

  test('does not throw an error if the modal element does not exist', () => {
    document.body.innerHTML = '';

    expect(() => {
      openPaymentModal();
    }).not.toThrow();
  });
});
