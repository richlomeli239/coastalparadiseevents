// Coastal Paradise Events - Global Interactions & Form Operations
// Official Contact: (941) 500-2566 | contact@coastalparadiseevents.com | Fort Myers, FL 33919

// Mobile Navigation Hamburger Control
function toggleMobileNav() {
  const toggleBtn = document.getElementById('mobileNavToggle');
  const mainNav = document.getElementById('mainNav');
  if (toggleBtn && mainNav) {
    const isActive = mainNav.classList.toggle('active');
    toggleBtn.classList.toggle('active', isActive);
    toggleBtn.setAttribute('aria-expanded', isActive ? 'true' : 'false');
  }
}

function closeMobileNav() {
  const toggleBtn = document.getElementById('mobileNavToggle');
  const mainNav = document.getElementById('mainNav');
  if (toggleBtn && mainNav) {
    mainNav.classList.remove('active');
    toggleBtn.classList.remove('active');
    toggleBtn.setAttribute('aria-expanded', 'false');
  }
}

document.addEventListener('DOMContentLoaded', function() {
  const toggleBtn = document.getElementById('mobileNavToggle');
  const mainNav = document.getElementById('mainNav');

  if (toggleBtn) {
    toggleBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      toggleMobileNav();
    });
  }

  // Close mobile nav when clicking outside
  document.addEventListener('click', function(e) {
    if (mainNav && mainNav.classList.contains('active')) {
      if (!mainNav.contains(e.target) && e.target !== toggleBtn && !toggleBtn.contains(e.target)) {
        closeMobileNav();
      }
    }
  });

  // Close mobile nav when a nav-link is clicked
  if (mainNav) {
    mainNav.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', function() {
        closeMobileNav();
      });
    });
  }
});

// Retainer Payment Modal Control
function openPaymentModal() {
  const modal = document.getElementById('paymentModal');
  if (modal) modal.classList.add('active');
}

function closePaymentModal() {
  const modal = document.getElementById('paymentModal');
  if (modal) modal.classList.remove('active');
}

// Close modal if user clicks backdrop
document.addEventListener('click', function(e) {
  const modal = document.getElementById('paymentModal');
  if (modal && e.target === modal) {
    closePaymentModal();
  }
});

// Southwest Florida Venue Autocomplete
const swflVenues = [
  "Luminary Hotel & Co., 2200 Edwards Dr, Fort Myers, FL 33901",
  "The Heitman House, 2577 First St, Fort Myers, FL 33901",
  "Burroughs Home & Gardens, 2505 First St, Fort Myers, FL 33901",
  "The Westin Cape Coral Resort at Marina Village, 5951 Silver King Blvd, Cape Coral, FL 33914",
  "Cape Cabaret, 4725 Vincennes Blvd, Cape Coral, FL 33904",
  "Margaritaville Beach Resort, 251 Crescent St, Fort Myers Beach, FL 33931",
  "Pink Shell Beach Resort & Marina, 275 Estero Blvd, Fort Myers Beach, FL 33931",
  "Tween Waters Island Resort & Spa, 15951 Captiva Dr, Captiva, FL 33924",
  "South Seas Island Resort, 5400 Plantation Rd, Captiva, FL 33924",
  "Sundial Beach Resort & Spa, 1451 Middle Gulf Dr, Sanibel, FL 33957",
  "Casa Ybel Resort, 2255 W Gulf Dr, Sanibel, FL 33957",
  "Hyatt Regency Coconut Point Resort & Spa, 5001 Coconut Rd, Bonita Springs, FL 34134",
  "The Ritz-Carlton, Naples, 280 Vanderbilt Beach Rd, Naples, FL 34108",
  "The Ritz-Carlton Golf Resort, 2600 Tiburon Dr, Naples, FL 34109",
  "Naples Grande Beach Resort, 475 Seagate Dr, Naples, FL 34103",
  "JW Marriott Marco Island Beach Resort, 400 S Collier Blvd, Marco Island, FL 34145"
];

function autocompleteVenue(val) {
  const list = document.getElementById('autocompleteList');
  if (!list) return;
  list.innerHTML = '';
  if (!val || val.length < 2) {
    list.style.display = 'none';
    return;
  }
  const lowerVal = val.toLowerCase();
  const matches = swflVenues.filter(v => v.toLowerCase().includes(lowerVal));
  if (matches.length === 0) {
    list.style.display = 'none';
    return;
  }
  matches.forEach(match => {
    const item = document.createElement('div');
    item.textContent = match;
    item.onclick = function() {
      const input = document.getElementById('venueInput');
      if (input) input.value = match;
      list.style.display = 'none';
      if (typeof updateEstimatedPrice === 'function') updateEstimatedPrice();
    };
    list.appendChild(item);
  });
  list.style.display = 'block';
}

document.addEventListener('click', function(e) {
  const input = document.getElementById('venueInput');
  const list = document.getElementById('autocompleteList');
  if (list && e.target !== input) {
    list.style.display = 'none';
  }
});


// Cache addons checkboxes globally
let cachedAddonCheckboxes = null;
function getAddonCheckboxes() {
  if (!cachedAddonCheckboxes) {
    cachedAddonCheckboxes = Array.from(document.querySelectorAll('.addons-grid input[type="checkbox"]'));
  }
  return cachedAddonCheckboxes;
}

// Dynamic Investment Range Estimator
function updateEstimatedPrice() {
  const priceDisplay = document.getElementById('priceDisplay');
  if (!priceDisplay) return;

  const eventType = document.getElementById('eventType')?.value || '';
  
  let baseMin = 1495;
  let baseMax = 2295;

  if (eventType.includes("Ceremony & Reception")) {
    baseMin = 1495; baseMax = 2495;
  } else if (eventType.includes("Reception Only")) {
    baseMin = 1195; baseMax = 1895;
  } else if (eventType.includes("Ceremony Only")) {
    baseMin = 595; baseMax = 895;
  } else if (eventType.includes("Corporate")) {
    baseMin = 1250; baseMax = 2200;
  } else if (eventType.includes("Resort")) {
    baseMin = 650; baseMax = 1250;
  } else if (eventType.includes("Bar")) {
    baseMin = 350; baseMax = 650;
  } else if (eventType.includes("Private")) {
    baseMin = 750; baseMax = 1450;
  }

  // Count checked add-ons
  let addonCount = 0;
  getAddonCheckboxes().forEach(cb => {
    if (cb.checked) addonCount++;
  });
  const addonMin = addonCount * 175;
  const addonMax = addonCount * 275;

  const finalMin = baseMin + addonMin;
  const finalMax = baseMax + addonMax;

  priceDisplay.textContent = `$${finalMin.toLocaleString()} – $${finalMax.toLocaleString()}`;
}


// Utility to prevent XSS
function escapeHTML(str) {
  if (typeof str !== 'string') return str;
  return str.replace(/[&<>'"]/g, function(tag) {
    const charsToReplace = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    };
    return charsToReplace[tag] || tag;
  });
}

// Operational FormSubmit.co AJAX Integration (100% Free, Instant Delivery)
async function handleQuoteSubmit(e) {
  e.preventDefault();
  const form = document.getElementById('quoteForm');
  const submitBtn = document.getElementById('quoteSubmitBtn') || form.querySelector('button[type="submit"]');
  const originalBtnHtml = submitBtn ? submitBtn.innerHTML : 'Submit Quote Request';

  // Extract form inputs
  const eventType = document.getElementById('eventType')?.value || 'Event';
  const city = document.getElementById('swflCity')?.value || 'Southwest Florida';
  const venue = document.getElementById('venueInput')?.value || 'TBD';
  const eventDate = document.getElementById('eventDate')?.value || 'TBD';
  const clientName = document.getElementById('clientName')?.value || 'Valued Client';
  const clientEmail = document.getElementById('clientEmail')?.value || '';
  const clientPhone = document.getElementById('clientPhone')?.value || '';
  const estimatedPrice = document.getElementById('priceDisplay')?.textContent || '$XXX';

  // Gather selected add-ons
  const selectedAddons = [];
  getAddonCheckboxes().forEach(cb => {
    if (cb.checked && cb.value) {
      selectedAddons.push(cb.value);
    }
  });

  const payload = {
    _subject: `New Event Quote Request: ${eventType} - ${eventDate} (${clientName})`,
    _template: 'table',
    _captcha: 'false',
    clientName: clientName,
    clientEmail: clientEmail,
    clientPhone: clientPhone,
    eventType: eventType,
    eventDate: eventDate,
    locationCity: city,
    venueAddress: venue,
    estimatedInvestmentRange: estimatedPrice,
    selectedAddOns: selectedAddons.length > 0 ? selectedAddons.join(', ') : 'None selected',
    leadSource: 'coastalparadiseevents.com/quote.html',
    submittedAt: new Date().toLocaleString()
  };

  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Transmitting Availability Request...';
  }

  try {
    const response = await fetch('https://formsubmit.co/ajax/richlomeli239@gmail.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      const quoteBox = document.querySelector('.quote-box');
      if (quoteBox) {
        quoteBox.innerHTML = `
          <div class="quote-success-box">
            <i class="fa-solid fa-circle-check quote-success-icon"></i>
            <h2 style="color: var(--gold-light); margin-bottom: 0.75rem; font-size: 1.8rem;">Availability Request Received!</h2>
            <p style="font-size: 1.05rem; color: #fff; max-width: 600px; margin: 0 auto 1.5rem;">
              Thank you, <strong>${escapeHTML(clientName)}</strong>. Your custom entertainment inquiry for <strong>${escapeHTML(eventDate)}</strong> in <strong>${escapeHTML(city)}</strong> has been transmitted directly to our director's desk.
            </p>
            <div style="background: var(--midnight-dark); border: 1px solid var(--card-border); border-radius: 8px; padding: 1.25rem; max-width: 500px; margin: 0 auto 1.5rem; text-align: left;">
              <div style="color: var(--gold-primary); font-weight: 700; margin-bottom: 0.35rem;">Expected Next Steps:</div>
              <ul style="color: var(--text-muted); font-size: 0.88rem; list-style: none; padding-left: 0;">
                <li style="margin-bottom: 0.4rem;"><i class="fa-solid fa-check" style="color: var(--gold-primary); margin-right: 0.5rem;"></i> Confirmation dispatched to <strong>${escapeHTML(clientEmail)}</strong></li>
                <li style="margin-bottom: 0.4rem;"><i class="fa-solid fa-check" style="color: var(--gold-primary); margin-right: 0.5rem;"></i> Calendar verification for <strong>${escapeHTML(venue)}</strong></li>
                <li><i class="fa-solid fa-check" style="color: var(--gold-primary); margin-right: 0.5rem;"></i> Personal follow-up via call or text to <strong>${escapeHTML(clientPhone)}</strong> within 24 hours</li>
              </ul>
            </div>
            <p style="font-size: 0.85rem; color: var(--text-muted);">
              Need immediate priority date locking? Call or text us directly at <a href="tel:+19415002566" style="color: var(--gold-primary); font-weight: 700;">(239) 318-0510</a>.
            </p>
          </div>
        `;
        window.scrollTo({ top: quoteBox.offsetTop - 100, behavior: 'smooth' });
      }
    } else {
      throw new Error('Network response was not ok.');
    }
  } catch (err) {
    console.error('Submission error:', err);
    alert(`Thank you ${clientName}! Your inquiry for ${eventDate} in ${city} has been received. If you do not hear from us shortly, please call or text us directly at (941) 500-2566.`);
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnHtml;
    }
  }
}

// Retainer Modal Invoice Request Handler
async function handleInvoiceSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalHtml = submitBtn ? submitBtn.innerHTML : 'Request Retainer Invoice';

  const name = form.querySelector('[name="clientFullName"]')?.value || 'Client';
  const email = form.querySelector('[name="clientInvoiceEmail"]')?.value || '';
  const phone = form.querySelector('[name="clientInvoicePhone"]')?.value || '';
  const date = form.querySelector('[name="clientEventDate"]')?.value || '';
  const method = form.querySelector('[name="invoiceMethod"]')?.value || 'Zelle / Direct ACH';

  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Processing Request...';
  }

  try {
    const payload = {
      _subject: `Retainer Invoice Request: ${date} (${name})`,
      _template: 'table',
      _captcha: 'false',
      clientFullName: name,
      invoiceEmail: email,
      contactPhone: phone,
      eventDate: date,
      preferredMethod: method,
      requestedAt: new Date().toLocaleString()
    };

    const res = await fetch('https://formsubmit.co/ajax/richlomeli239@gmail.com', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (res.ok) {
      alert(`Thank you, ${name}! Your retainer invoice & agreement request for ${date} has been sent to Coastal Paradise Events. We will email your digital contract and confirmation within 24 hours. You may also text (239) 318-0510 with any immediate questions.`);
      closePaymentModal();
      form.reset();
    } else {
      throw new Error('Invoice request failed');
    }
  } catch (err) {
    alert(`Thank you, ${name}! Your request has been noted. Please call or text us at (941) 500-2566 to immediately confirm your date.`);
    closePaymentModal();
  } finally {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalHtml;
    }
  }
}
