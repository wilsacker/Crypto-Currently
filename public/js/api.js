const fetch = require('node-fetch');

const apiKeyCrypto = "3E0B077E-BFB7-4E8B-AA9F-CC737B90C419";
const baseUrlCrypto = "https://rest.coinapi.io/v1/";

const apiKeyCurrency = "fca_live_lcB5KgViVtG6E9M7fglQ5KVkLn71CudXQWCZ1Bdq";
const baseUrlCurrency = "https://api.freecurrencyapi.com/v1/latest?";

function fetchCryptoData() {
  return new Promise((resolve, reject) => {
    const coins = [
      "BTC",   // Bitcoin
      // "ETH",   // Ethereum
      // "XRP",   // Ripple
      // "LTC",   // Litecoin
      // "ADA",   // Cardano
      // "DOT",   // Polkadot
      // "LINK",  // Chainlink
      // "XLM",   // Stellar
      // "SOL",   // Solana
      // "DOGE"   // Dogecoin
    ];

    const promises = coins.map(coin => {
      const url = `${baseUrlCrypto}exchangerate/${coin}/USD`;

      return fetch(url, {
        headers: {
          "X-CoinAPI-Key": apiKeyCrypto
        }
      })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        return {
          name: data.asset_id_base,
          rate: data.rate,
          time: data.time,
          coin: coin
        };
      })
      .catch(error => {
        console.error(`Error fetching ${coin} data:`, error);
        return null; // Handle errors gracefully
      });
    });

    Promise.all(promises)
      .then(results => resolve(results))
      .catch(error => reject(error));
  });
}

function fetchCurrencyData() {
  return new Promise((resolve, reject) => {
    const url = `${baseUrlCurrency}apikey=${apiKeyCurrency}`;

    fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      resolve(data);
    })
    .catch(error => {
      reject(error);
    });
  });
}

module.exports = {
  fetchCryptoData,
  fetchCurrencyData
};

document.addEventListener('DOMContentLoaded', () => {
  fetch('https://api.coindesk.com/v1/bpi/currentprice/BTC.json')
      .then(response => response.json())
      .then(data => {
          document.getElementById('bitcoin-price').textContent = data.bpi.USD.rate;
          // Assuming you have other endpoints for market cap and 24h change
          document.getElementById('bitcoin-market-cap').textContent = '...'; // Populate with real data
          document.getElementById('bitcoin-change').textContent = '...'; // Populate with real data
      })
      .catch(error => console.error('Error fetching Bitcoin data:', error));
});
