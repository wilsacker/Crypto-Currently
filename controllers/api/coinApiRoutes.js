// const fetch = require('node-fetch'); // Use dynamic import for node-fetch v3.x

const apiKeyCrypto = "3E0B077E-BFB7-4E8B-AA9F-CC737B90C419";
const apiKeyCryptoTwo = "1E642530-F9A3-4801-95DF-BE1246F146EA";
const apiKeyCryptoThree = "6E68E2E3-6D09-4351-8F8F-E706C68400E8";
const baseUrlCrypto = "https://rest.coinapi.io/v1/";

const apiKeyCurrency = "fca_live_lcB5KgViVtG6E9M7fglQ5KVkLn71CudXQWCZ1Bdq";
const baseUrlCurrency = "https://api.freecurrencyapi.com/v1/latest";

function fetchCryptoData(coin) {
  return new Promise((resolve, reject) => {
    const url = `${baseUrlCrypto}exchangerate/${coin}/USD`;
    console.log(`Fetching URL: ${url}`); // Debugging: Log the URL being fetched

    fetch(url, {
      headers: {
        "X-CoinAPI-Key": apiKeyCryptoThree
      }
    })
    .then(response => {
      console.log(`Response Status: ${response.status}`); // Debugging: Log response status
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log('API Response:', data); // Debugging: Log the API response

      // Adjust based on the actual API response structure
      if (!data.asset_id_base || !data.rate) {
        throw new Error('Unexpected response structure');
      }

      const result = {
        name: data.asset_id_base,
        quote: data.asset_id_quote,
        rate: data.rate,
        time: data.time,
      };

      resolve(result);
    })
    .catch(error => {
      console.error(`Error fetching ${coin} data:`, error);
      reject(error); // Ensure the Promise is rejected on error
    });
  });
}

function fetchCurrencyData() {
  return new Promise((resolve, reject) => {
    const url = `${baseUrlCurrency}?apikey=${apiKeyCurrency}`;
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => resolve(data))
      .catch(error => reject(error));
  });
}

// Example usage
// fetchCryptoData('ETH')
//   .then(data => console.log('Fetched Data:', data))
//   .catch(error => console.error('Error:', error));


module.exports = {
  fetchCryptoData,
  fetchCurrencyData
};


