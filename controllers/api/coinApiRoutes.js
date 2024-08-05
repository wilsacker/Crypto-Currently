// const fetch = require('node-fetch'); // Use dynamic import for node-fetch v3.x

const apiKeyCrypto = "3E0B077E-BFB7-4E8B-AA9F-CC737B90C419";
const apiKeyCryptoTwo = "1E642530-F9A3-4801-95DF-BE1246F146EA";
const apiKeyCryptoThree = "6E68E2E3-6D09-4351-8F8F-E706C68400E8";
const apiKeyCryptoForth = "85FC6197-EA25-4517-A283-62522FCFD65A";
const apiKeyCryptoFifth = "55F697F0-E8EC-4F85-9565-D069E5A344E4";
const apiKeyCryptoSixth = "909A634B-0428-4C25-9FCA-6E8377203FA6";

const baseUrlCrypto = "https://rest.coinapi.io/v1/";

const apiKeyCurrency = "fca_live_lcB5KgViVtG6E9M7fglQ5KVkLn71CudXQWCZ1Bdq";
const baseUrlCurrency = "https://api.freecurrencyapi.com/v1/latest";

function fetchCryptoData(coin) {
 
  return new Promise((resolve, reject) => {
    const url = `${baseUrlCrypto}exchangerate/${coin}/USD`;
    console.log(`Fetching URL: ${url}`); // Debugging: Log the URL being fetched
    fetch(url, {
      headers: {
        "X-CoinAPI-Key": apiKeyCryptoSixth
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




module.exports = {
  fetchCryptoData,
 
};


