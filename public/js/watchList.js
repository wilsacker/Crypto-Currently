document.addEventListener('DOMContentLoaded', () => {
  const addToWatchlistBtn = document.getElementById('add-to-watchlist');
  const cryptoInfoSection = document.getElementById('crypto-info');

  if (addToWatchlistBtn) {
    addToWatchlistBtn.addEventListener('click', async () => {
      const cryptoId = cryptoInfoSection.dataset.cryptoId;
      if (!cryptoId) {
        alert('No cryptocurrency selected');
        return;
      }

      try {
        const response = await fetch('/mywatchList/add', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ cryptoId }),
        });

        if (response.ok) {
          alert('Added to watchlist!');
        } else {
          const errorData = await response.json();
          alert(errorData.message || 'Failed to add to watchlist');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while adding to watchlist');
      }
    });
  }

  document.querySelectorAll('.remove-from-watchlist').forEach(button => {
    button.addEventListener('click', async function() {
      const cryptoId = this.dataset.cryptoId;
      try {
        const response = await fetch('/mywatchList/remove', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ cryptoId }),
        });

        if (response.ok) {
          this.closest('.watchlist-item').remove();
        } else {
          const errorData = await response.json();
          alert(errorData.message || 'Failed to remove from watchlist');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while removing from watchlist');
      }
    });
  });
});
