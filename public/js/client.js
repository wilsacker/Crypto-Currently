// public/js/client.js

function handleButtonClick(event) {
  const cryptoInfoToggle = document.getElementById("crypto-info");
  const button = event.target;
  const abbreviation = button.dataset.abbreviation;

  cryptoInfoToggle.style.display = "block";
  cryptoInfoToggle.dataset.cryptoId = button.dataset.cryptoId; // Store the crypto ID

  getData(abbreviation);
}

function getData(coin) {
  fetch(`/api/crypto?symbol=${coin}`)
    .then((response) => response.json())
    .then((data) => {
      const name = data.name || "N/A";
      const rate = data.rate || "N/A";
      const time = data.time || "N/A";
      const formattedRate = typeof rate === "number" ? rate.toFixed(4) : rate;
      const newDate = new Date(time);

      document.getElementById("crypto-price").textContent = `Name: ${name}`;
      document.getElementById("crypto-market-cap").textContent = `Rate: ${formattedRate}`;
      document.getElementById("crypto-change").textContent = `Time: ${newDate}`;
      
      // Update the Add to Watchlist button with the correct crypto ID
      const addToWatchlistBtn = document.getElementById("add-to-watchlist");
      if (addToWatchlistBtn) {
        addToWatchlistBtn.dataset.cryptoId = data.id;
      }
    })
    .catch((error) => console.error("Error fetching cryptocurrency data:", error));
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

  // Add event listener for the Add to Watchlist button
  const addToWatchlistBtn = document.getElementById("add-to-watchlist");
  if (addToWatchlistBtn) {
    addToWatchlistBtn.addEventListener("click", async () => {
      const cryptoId = addToWatchlistBtn.dataset.cryptoId;
      if (!cryptoId) {
        alert("No cryptocurrency selected");
        return;
      }

      try {
        const response = await fetch("/mywatchList/add", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ cryptoId }),
        });

        if (response.ok) {
          alert("Added to watchlist!");
        } else {
          const errorData = await response.json();
          alert(errorData.message || "Failed to add to watchlist");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while adding to watchlist");
      }
    });
  }
});
