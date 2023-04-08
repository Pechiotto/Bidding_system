document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("select-system").addEventListener("change", () => {
      loadBidTable("");
  });

  loadBidTable("");
});

function loadBidTable(currentBid) {
  fetch("bid.txt")
      .then(response => {
          if (!response.ok) {
              throw new Error("Failed to fetch bid.txt");
          }
          return response.text();
      })
      .then(data => {
          const lines = data.split("\n");
          const tbody = document.getElementById("bid-table").getElementsByTagName("tbody")[0];
          tbody.innerHTML = "";
          lines.forEach(line => {
              const [bidPath, bid, description] = line.split(",");
              if (bidPath === currentBid) {
                  const row = tbody.insertRow();
                  const cellBid = row.insertCell();
                  cellBid.innerHTML = `<button>${bid}</button>`;
                  cellBid.firstElementChild.addEventListener("click", () => {
                      loadBidTable(currentBid + bid + "--");
                  });
                  const cellDescription = row.insertCell();
                  cellDescription.textContent = description;
              }
          });
      })
      .catch(error => {
          console.error("Error:", error);
      });
}
