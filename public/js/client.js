function handleButtonClick(event) {
    const button = event.target;
    const abbreviation = button.dataset.abbreviation;

    fetch(`/api/crypto?symbol=${abbreviation}`)
        .then(response => response.json())
        .then(data => {
            const price = data.price || 'N/A';
            const marketCap = data.marketCap || 'N/A';
            const change = data.change || 'N/A';

            document.getElementById('crypto-price').textContent = `Price: ${price}`;
            document.getElementById('crypto-market-cap').textContent = `Market Cap: ${marketCap}`;
            document.getElementById('crypto-change').textContent = `Change: ${change}`;
        })
        .catch(error => console.error('Error fetching cryptocurrency data:', error));
};

document.addEventListener('DOMContentLoaded', () => {
    // Fetch popular items
    fetch('/api/popular-items')
        .then(response => response.json())
        .then(data => {
            const popularItemsList = document.querySelector('#top-ten-popular header');
            popularItemsList.innerHTML = ''; // Clear existing items

            data.forEach(item => {
                const button = document.createElement('button');
                button.className = 'popular-items';
                button.dataset.abbreviation = item.abbreviation; // Store abbreviation in data attribute
                button.textContent = `${item.name} (${item.abbreviation})`;
                popularItemsList.appendChild(button);
            });

            // Add event listeners to newly added buttons
            document.querySelectorAll('.popular-items').forEach(button => {
                button.addEventListener('click', handleButtonClick);
            });
        })
        .catch(error => console.error('Error fetching popular items:', error));


});
