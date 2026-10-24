const fs = require('fs');
const path = require('path');

// Read main.js and extract the functions to test
const mainJsCode = fs.readFileSync(path.resolve(__dirname, 'main.js'), 'utf8');

// Note: DOMContentLoaded event listener will run when evaluating the script,
// so we need to set up a basic DOM before evaluation
document.body.innerHTML = `
  <button id="mobileNavToggle" aria-expanded="false"></button>
  <nav id="mainNav"></nav>
`;

// Extract functions. We use a function wrapper to isolate and export the functions we want.
const scriptCode = `
  ${mainJsCode}
  return { toggleMobileNav, closeMobileNav };
`;

let toggleMobileNav, closeMobileNav;

beforeAll(() => {
    // Extract functions
    const exportedFunctions = new Function(scriptCode)();
    toggleMobileNav = exportedFunctions.toggleMobileNav;
    closeMobileNav = exportedFunctions.closeMobileNav;
});

describe('toggleMobileNav', () => {
  beforeEach(() => {
    // Set up a mock DOM before each test
    document.body.innerHTML = `
      <button id="mobileNavToggle" aria-expanded="false"></button>
      <nav id="mainNav"></nav>
    `;
  });

  it('should toggle active class on mobileNavToggle and mainNav', () => {
    const toggleBtn = document.getElementById('mobileNavToggle');
    const mainNav = document.getElementById('mainNav');

    // Initially they should not have active class
    expect(toggleBtn.classList.contains('active')).toBe(false);
    expect(mainNav.classList.contains('active')).toBe(false);

    // Call function
    toggleMobileNav();

    // Now they should have active class
    expect(toggleBtn.classList.contains('active')).toBe(true);
    expect(mainNav.classList.contains('active')).toBe(true);
    expect(toggleBtn.getAttribute('aria-expanded')).toBe('true');

    // Call again to toggle off
    toggleMobileNav();

    expect(toggleBtn.classList.contains('active')).toBe(false);
    expect(mainNav.classList.contains('active')).toBe(false);
    expect(toggleBtn.getAttribute('aria-expanded')).toBe('false');
  });

  it('should not throw error if elements are missing', () => {
    document.body.innerHTML = ''; // Clear DOM
    expect(() => toggleMobileNav()).not.toThrow();
  });

  it('should not throw error if only mainNav is missing', () => {
    document.body.innerHTML = '<button id="mobileNavToggle" aria-expanded="false"></button>';
    expect(() => toggleMobileNav()).not.toThrow();
  });

  it('should not throw error if only mobileNavToggle is missing', () => {
    document.body.innerHTML = '<nav id="mainNav"></nav>';
    expect(() => toggleMobileNav()).not.toThrow();
  });
});

describe('closeMobileNav', () => {
  beforeEach(() => {
    // Set up a mock DOM with active state
    document.body.innerHTML = `
      <button id="mobileNavToggle" class="active" aria-expanded="true"></button>
      <nav id="mainNav" class="active"></nav>
    `;
  });

  it('should remove active class and set aria-expanded to false', () => {
    const toggleBtn = document.getElementById('mobileNavToggle');
    const mainNav = document.getElementById('mainNav');

    expect(toggleBtn.classList.contains('active')).toBe(true);
    expect(mainNav.classList.contains('active')).toBe(true);

    closeMobileNav();

    expect(toggleBtn.classList.contains('active')).toBe(false);
    expect(mainNav.classList.contains('active')).toBe(false);
    expect(toggleBtn.getAttribute('aria-expanded')).toBe('false');
  });

  it('should not throw error if elements are missing', () => {
    document.body.innerHTML = ''; // Clear DOM
    expect(() => closeMobileNav()).not.toThrow();
  });
});
