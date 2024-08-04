const express = require('express');
const { Watchlist } = require('../../models');
const router = express.Router();


document.getElementById('add-to-watchlist').addEventListener('click', async () => {
    const cryptoId = // Fetch the crypto ID from your DOM or API
    try {
      const response = await fetch('/api/watchlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cryptoId })
      });

      if (response.ok) {
        alert('Added to watchlist!');
        // Optionally, refresh the watchlist or update the UI
      } else {
        alert('Failed to add to watchlist. Please log in.');
      }
    } catch (err) {
      console.error('Error:', err);
      alert('An error occurred. Please try again.');
    }
  });
  module.exports= router;