function handleButtonClick(event) {
    const cryptoInfoToggle = document.getElementById("crypto-info")
    const button = event.target;
    const abbreviation = button.dataset.abbreviation;

    cryptoInfoToggle.style.display = "block"

    fetch(`/api/crypto?symbol=${abbreviation}`)
        .then(response => response.json())
        .then(data => {
            const name = data.name || 'N/A';
            const rate = data.rate || 'N/A';
            const time = data.time || 'N/A';
            const formattedRate = typeof rate === 'number' ? rate.toFixed(4) : rate; // Format to 4 decimals
            const newDate = new Date(time);

            document.getElementById('crypto-price').textContent = `Name: ${name}`;
            document.getElementById('crypto-market-cap').textContent = `Rate: ${formattedRate}`;
            document.getElementById('crypto-change').textContent = `Time: ${newDate}`;
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

