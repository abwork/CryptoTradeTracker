//initialize
let coins = "";
fetchData();

//fecth data from api
function fetchData() {
  const url = "https://api.coinmarketcap.com/v1/ticker/?limit=100";
  fetch(url)
    .then(function(response) {
      return response.json();
    })
    .then(function(coinsJson) {
      coins = coinsJson;
      displayData(coins);
    });
}

//display data
function displayData(data) {
  let count = 1;
  let table = document.getElementById("table");
  for (let i = 0; i < data.length; i++) {
    buildRow(
      data[i],
      table,
      "name",
      "symbol",
      "price_usd",
      "rank",
      "percent_change_24h",
      count++
    );
  }
}

//build row from the data
function buildRow(
  value,
  table,
  name,
  symbol,
  price,
  rank,
  percent_change_24h,
  count
) {
  const tr = document.createElement("tr");
  tr.className = "rows";
  const td_count = document.createElement("td");
  const td_name = document.createElement("td");
  const td_symbol = document.createElement("td");
  const td_price = document.createElement("td");
  const td_rank = document.createElement("td");
  const td_percent_change_24h = document.createElement("td");
  td_count.textContent = count;
  td_name.textContent = value[name];
  td_symbol.textContent = value[symbol];
  td_price.textContent = value[price];
  td_rank.textContent = value[rank];
  td_percent_change_24h.textContent = value[percent_change_24h];
  tr.appendChild(td_count);
  tr.appendChild(td_name);
  tr.appendChild(td_symbol);
  tr.appendChild(td_price);
  tr.appendChild(td_rank);
  tr.appendChild(td_percent_change_24h);
  table.appendChild(tr);
}

//reload table
function reloadTable() {
  const table = document.getElementById("table");
  let x = document
    .querySelectorAll(".rows")
    .forEach(e => e.parentNode.removeChild(e));
}

//sorting functions
//sort by name
function sortByName() {
  reloadTable();
  coins.sort(function(coin1, coin2) {
    if (coin1.name.toLowerCase() < coin2.name.toLowerCase()) {
      return -1;
    } else if (coin2.name.toLowerCase() < coin1.name.toLowerCase()) {
      return 1;
    } else {
      return 0;
    }
  });
  displayData(coins);
}

//sort by price
function sortByPrice() {
  reloadTable();
  coins.sort(function(coin1, coin2) {
    return coin1.price_usd - coin2.price_usd;
  });
  displayData(coins);
}

//sort by rank
function sortByRank() {
  reloadTable();
  coins.sort(function(coin1, coin2) {
    return coin1.rank - coin2.rank;
  });
  displayData(coins);
}

//get filtered coins
function filterCoins() {
  const inputText = document.getElementById("searchBar").value;
  const filteredCoins = coins.filter(function(coin) {
    return coin.name.toLowerCase().includes(inputText.toLocaleLowerCase());
  });
  reloadTable();
  displayData(filteredCoins);
}
