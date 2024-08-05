// public/js/client.js
let selectedCrypto = { symbol: "" };
function handleButtonClick(event) {
  const cryptoInfoToggle = document.getElementById("crypto-info");
  const button = event.target;
  const abbreviation = button.dataset.abbreviation;

  cryptoInfoToggle.style.display = "block";
  cryptoInfoToggle.dataset.cryptoId = button.dataset.cryptoId; // Store the crypto ID

 
getData(abbreviation);
     
}

function getData(coin) {
  // let name = "";
  // let rate = "";
  // let time = "";
  fetch(`/api/crypto?symbol=${coin}`)
    .then((response) => response.json())
    .then((data) => {
      //  name = data.name || "BTC";
      //  rate = data.rate || "500";
      //  time = data.time || "August 4, 2024, 21:00:00";
      // const formattedRate = typeof rate === "number" ? rate.toFixed(4) : rate;
      // const newDate = new Date(time);

      // document.getElementById("crypto-price").textContent = `Name: ${name}`;
      // document.getElementById("crypto-market-cap").textContent = `Rate: ${formattedRate}`;
      // document.getElementById("crypto-change").textContent = `Time: ${newDate}`;
     const name = data.name || "N/A";
     const rate = data.rate || "N/A";
     const time = data.time || "N/A";
     const formattedRate = typeof rate === "number" ? rate.toFixed(4) : rate;
     const newDate = new Date(time);

     document.getElementById("crypto-price").textContent = `Name: ${name}`;
     document.getElementById("crypto-market-cap").textContent = `Rate: ${formattedRate}`;
     document.getElementById("crypto-change").textContent = `Time: ${newDate}`;
    
    
      selectedCrypto.symbol = name;
    })

    .catch((error) =>
      console.error("Error fetching cryptocurrency data:", error)
    );
}


document.addEventListener("DOMContentLoaded", () => {
  // Fetch popular items
  fetch("/api/popular-items")
    .then((response) => response.json())
    .then((data) => {
      const popularItemsList = document.querySelector(
        "#top-ten-popular header"
      );
      popularItemsList.innerHTML = ""; // Clear existing items

      data.forEach((item) => {
        const button = document.createElement("button");
        button.className = "popular-items";
        button.dataset.abbreviation = item.abbreviation;
        button.dataset.cryptoId = item.id; // Add this line to store the crypto ID
        button.textContent = `${item.name} (${item.abbreviation})`;
        popularItemsList.appendChild(button);
      });

      // Add event listeners to newly added buttons
      document.querySelectorAll(".popular-items").forEach((button) => {
        button.addEventListener("click", handleButtonClick);
      });
    })
    .catch((error) => console.error("Error fetching popular items:", error));

});
