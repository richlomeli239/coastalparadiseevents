// Retainer Payment Modal Control
function openPaymentModal() {
  const modal = document.getElementById('paymentModal');
  if (modal) modal.classList.add('active');
}

function closePaymentModal() {
  const modal = document.getElementById('paymentModal');
  if (modal) modal.classList.remove('active');
}

// Southwest Florida Venue Autocomplete
const swflVenues = [
  "Luminary Hotel & Co. (Fort Myers)",
  "The Heitman House (Fort Myers)",
  "Burroughs Home & Gardens (Fort Myers)",
  "The Westin Cape Coral Resort at Marina Village",
  "Cape Cabaret (Cape Coral)",
  "Margaritaville Beach Resort (Fort Myers Beach)",
  "Pink Shell Beach Resort & Marina (Fort Myers Beach)",
  "Tween Waters Island Resort & Spa (Captiva Island)",
  "South Seas Island Resort (Captiva Island)",
  "Sundial Beach Resort & Spa (Sanibel Island)",
  "Casa Ybel Resort (Sanibel Island)",
  "Hyatt Regency Coconut Point Resort and Spa (Bonita Springs)",
  "The Ritz-Carlton, Naples",
  "Naples Grande Beach Resort",
  "JW Marriott Marco Island Beach Resort"
];

function autocompleteVenue(val) {
  const list = document.getElementById('autocompleteList');
  if (!list) return;
  list.innerHTML = '';
  if (!val || val.length < 2) {
    list.style.display = 'none';
    return;
  }
  const matches = swflVenues.filter(v => v.toLowerCase().includes(val.toLowerCase()));
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

function updateEstimatedPrice() {
  const priceDisplay = document.getElementById('priceDisplay');
  if (priceDisplay) {
    priceDisplay.textContent = "$XXX";
  }
}

function handleQuoteSubmit(e) {
  e.preventDefault();
  const city = document.getElementById('swflCity')?.value || 'Southwest Florida';
  const date = document.getElementById('eventDate')?.value || 'your selected date';
  alert(`Thank you! Your availability request for ${date} in ${city} has been received. We will contact you shortly with a customized $XXX investment estimate.`);
}

function handlePaymentSubmit(e) {
  e.preventDefault();
  alert('Secure Retainer Portal initialized. You will be redirected to the encrypted checkout processing screen.');
  closePaymentModal();
}
