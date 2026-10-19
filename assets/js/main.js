
    // Tab Navigation
    function showPage(pageId) {
      document.querySelectorAll('.page-section').forEach(el => el.classList.remove('active'));
      document.querySelectorAll('.nav-link').forEach(el => el.classList.remove('active'));
      
      const target = document.getElementById(pageId);
      if (target) {
        target.classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }

      const activeBtn = Array.from(document.querySelectorAll('.nav-link')).find(btn => 
        btn.getAttribute('onclick')?.includes(`'${pageId}'`)
      );
      if (activeBtn) activeBtn.classList.add('active');
    }

    // Modal Control
    function openPaymentModal() {
      document.getElementById('paymentModal').classList.add('active');
    }
    function closePaymentModal() {
      document.getElementById('paymentModal').classList.remove('active');
    }

    // Venue Autocomplete
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
          document.getElementById('venueInput').value = match;
          list.style.display = 'none';
        };
        list.appendChild(item);
      });
      list.style.display = 'block';
    }

    document.addEventListener('click', function(e) {
      if (e.target.id !== 'venueInput') {
        const list = document.getElementById('autocompleteList');
        if (list) list.style.display = 'none';
      }
    });

    // Form Submissions
    function updateEstimatedPrice() {
      // Dynamic calculation placeholder maintains $XXX format
      document.getElementById('priceDisplay').textContent = "$XXX";
    }

    function handleQuoteSubmit(e) {
      e.preventDefault();
      const city = document.getElementById('swflCity').value;
      const date = document.getElementById('eventDate').value;
      alert(`Thank you! Your availability request for ${date} in ${city} has been received. We will contact you at your provided details shortly with a tailored $XXX quote.`);
    }

    function handlePaymentSubmit(e) {
      e.preventDefault();
      alert('Secure Retainer Portal initialized. You will be redirected to the encrypted checkout processing screen.');
      closePaymentModal();
    }
