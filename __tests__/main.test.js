const fs = require('fs');
const path = require('path');

const jsCode = fs.readFileSync(path.resolve(__dirname, '../assets/js/main.js'), 'utf8');

describe('closeMobileNav', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <button id="mobileNavToggle" class="active" aria-expanded="true"></button>
      <nav id="mainNav" class="active"></nav>
    `;

    // Create an isolated script environment for each test
    // To avoid "closeMobileNav has already been declared" if it was let/const
    // but here it's function closeMobileNav(), which in non-strict eval gets re-declared or hoisted
    // Better to use eval cautiously.
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('should remove active classes and set aria-expanded to false', () => {
    eval(jsCode);
    const toggleBtn = document.getElementById('mobileNavToggle');
    const mainNav = document.getElementById('mainNav');

    expect(mainNav.classList.contains('active')).toBe(true);
    expect(toggleBtn.classList.contains('active')).toBe(true);
    expect(toggleBtn.getAttribute('aria-expanded')).toBe('true');

    closeMobileNav();

    expect(mainNav.classList.contains('active')).toBe(false);
    expect(toggleBtn.classList.contains('active')).toBe(false);
    expect(toggleBtn.getAttribute('aria-expanded')).toBe('false');
  });

  it('should not throw if mainNav is missing', () => {
    document.body.innerHTML = `
      <button id="mobileNavToggle" class="active" aria-expanded="true"></button>
    `;
    eval(jsCode);

    expect(() => {
      closeMobileNav();
    }).not.toThrow();
  });

  it('should not throw if mobileNavToggle is missing', () => {
    document.body.innerHTML = `
      <nav id="mainNav" class="active"></nav>
    `;
    eval(jsCode);

    expect(() => {
      closeMobileNav();
    }).not.toThrow();
  });

  it('should not throw if both elements are missing', () => {
    document.body.innerHTML = '';
    eval(jsCode);

    expect(() => {
      closeMobileNav();
    }).not.toThrow();
  });
});
