const fs = require('fs');
const path = require('path');

const mainJsCode = fs.readFileSync(path.resolve(__dirname, 'main.js'), 'utf8');

describe('closePaymentModal', () => {
  beforeAll(() => {
    document.body.innerHTML = `
      <div id="paymentModal"></div>
    `;
    // Execute in the global scope
    window.eval(mainJsCode);
  });

  beforeEach(() => {
    document.body.innerHTML = `
      <div id="paymentModal"></div>
    `;
  });

  it('should remove the "active" class from the payment modal if it exists', () => {
    const modal = document.getElementById('paymentModal');
    modal.classList.add('active');
    expect(modal.classList.contains('active')).toBe(true);

    window.closePaymentModal();

    expect(modal.classList.contains('active')).toBe(false);
  });

  it('should not throw an error if the payment modal does not exist', () => {
    document.body.innerHTML = '';
    expect(() => window.closePaymentModal()).not.toThrow();
  });
});
