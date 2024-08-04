const cryptoInfoToggle = document.getElementById("crypto-info")

document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.getElementById('crypto-search-form');
    const searchInput = document.getElementById('crypto-search-input');
  
    searchForm.addEventListener('submit', (event) => {
      event.preventDefault(); // Prevent form from submitting normally
      const abbreviation = searchInput.value.trim().toUpperCase();
     
     console.log(abbreviation)

      if (abbreviation) {
        performSearch(abbreviation);
      }
    });
  

    function performSearch(abbreviation) {
      fetch(`/api/crypto?symbol=${abbreviation}`)
        .then(response => response.json())
        .then(data => {
          const name = data.name || 'N/A';
          const rate = data.rate || 'N/A';
          const time = data.time || 'N/A';
          const formattedRate = typeof rate === 'number' ? rate.toFixed(4) : rate; // Format to 4 decimals
          const newDate = new Date(time);
          document.getElementById('crypto-price').textContent = `Name: ${name}`;
          document.getElementById('crypto-market-cap').textContent = `Rate: ${formattedRate} `;
          document.getElementById('crypto-change').textContent = `Time: ${newDate}`;
          cryptoInfoToggle.style.display = "block"
        })
        .catch(error => console.error('Error fetching cryptocurrency data:', error));
    }
  });