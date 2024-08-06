document.addEventListener('DOMContentLoaded', () => {
  const addToWatchListBtn = document.getElementById('add-to-watchlist');

  if (addToWatchListBtn) {
    addToWatchListBtn.addEventListener('click', async () => {

      const cryptoData = document.getElementById("crypto-price");
      const symbol  = cryptoData.dataset.crypto
      if (!symbol) {
        alert('No cryptocurrency selected or data not available');
        return;
      }

      console.log('Adding to watchlist:', symbol); // Debugging: Log the symbol being sent

      // try {
        const response = await fetch('/watchList/add', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ symbol }), 
        });

        const result = await response.json();
        console.log('Response:', result); // Debugging: Log the response from the server

        if (response.ok) {
          alert('Added to watchlist!');
        } else if (response.status === 401) {
          alert(result.message);
          window.location.href = '/login'; // Redirect to login page
        } else {
          alert(result.message || 'Failed to add to watchlist');
        }
      // } catch (error) {
      //   console.error('Error:', error);
      //   alert('An error occurred while adding to watchlist');
      // }
    });
  }
});