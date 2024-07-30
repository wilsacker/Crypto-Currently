document.addEventListener('DOMContentLoaded', () => {
    fetch('/api/popular-items')
        .then(response => response.json())
        .then(data => {
            const popularItemsList = document.querySelector('#top-ten-popular ul');
            popularItemsList.innerHTML = ''; // Clear existing items

            data.popularItems.forEach(item => {
                const li = document.createElement('li');
                li.textContent = item;
                popularItemsList.appendChild(li);
            });
        })
        .catch(error => console.error('Error fetching popular items:', error));

    // Fetch Bitcoin data if needed
    fetch('/api/crypto')
        .then(response => response.json())
        .then(data => {
            const bitcoinPrice = data.cryptoData.find(crypto => crypto.coin === 'BTC');
            if (bitcoinPrice) {
                document.getElementById('bitcoin-price').textContent = bitcoinPrice.rate;
                // Populate with real data if available
                document.getElementById('bitcoin-market-cap').textContent = '...'; 
                document.getElementById('bitcoin-change').textContent = '...'; 
            }
        })
        .catch(error => console.error('Error fetching Bitcoin data:', error));
});


