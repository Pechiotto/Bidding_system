// ビディング履歴を格納する配列
const biddingHistory = [];

// 追加: BBOアラートテーブルを解析する関数
function parseBBOalertTable(alertTableString) {
  const table = {};

  alertTableString.split(';').forEach((alertString) => {
    const [bidString, alert] = alertString.split('=');
    const bids = bidString.split('/');
    bids.forEach((bid) => {
      if (bid && alert) {
        table[bid.trim()] = alert.trim();
      }
    });
  });


  return table;
}

// 追加: ビディングシステムの文字列を解析する関数
function parseBiddingSystem(systemString) {
  const system = {};
  const lines = systemString.split('\n');

  lines.forEach((line) => {
    const [bid, response] = line.split(',');
    if (bid && response) {
      system[bid.trim()] = response.trim();
    }
  });


  return system;
}

// 追加: ビディング内容を表示する関数
function showBidContent(bidContent) {
  const bidContentElement = document.getElementById('bid-content');
  bidContentElement.textContent = bidContent;
}

// ボタンがクリックされたときの処理
function handleBidButtonClick(event) {
  const bid = event.target.getAttribute('data-bid');
  const alert = biddingSystemString[bid];

  if (alert) {
    addToBiddingHistory(2, bid, alert);
  } else {
    addToBiddingHistory(2, bid);
  }

  // 追加: ビディング内容を表示
  const bidContent = biddingSystem[bid];
  if (bidContent) {
    showBidContent(bidContent);
  } else {
    showBidContent('');
  }
}

function updateBiddingTable() {
    const biddingTableBody = document.getElementById('bidding-table').querySelector('tbody');
    biddingTableBody.innerHTML = '';
  
    biddingHistory.forEach((bidItem, index) => {
      const row = document.createElement('tr');
      const playerCell = document.createElement('td');
      playerCell.textContent = bidItem.player;
      row.appendChild(playerCell);
  
      const bidCell = document.createElement('td');
      bidCell.textContent = bidItem.bid;
      row.appendChild(bidCell);
  
      const alertCell = document.createElement('td');
      if (bidItem.alert) {
        alertCell.textContent = bidItem.alert;
      } else {
        alertCell.textContent = '-';
      }
      row.appendChild(alertCell);
  
      biddingTableBody.appendChild(row);
  
      if ((index + 1) % 4 === 0) {
        const separatorRow = document.createElement('tr');
        const separatorCell = document.createElement('td');
        separatorCell.colSpan = 4;
        separatorRow.appendChild(separatorCell);
        biddingTableBody.appendChild(separatorRow);
      }
    });
  }

  function addToBiddingHistory(player, bid, alert) {
    const bidItem = {
      player: player,
      bid: bid,
      alert: alert
    };
    biddingHistory.push(bidItem);
    updateBiddingTable(); // 追加
  }
  
  

// ビディングシステムの文字列
const biddingSystemString = `1C, 12-14bal/12+!C/18+any; 1D, 0-6(7) any/8-11 unbal no 4M`;

// ビディングシステムを解析
const biddingSystem = parseBiddingSystem(biddingSystemString);

// ボタンのイベントリスナーを設定
document.addEventListener('DOMContentLoaded', () => {
  const bidButtons = document.querySelectorAll('.bid-button');

  bidButtons.forEach((button) => {
    button.addEventListener('click', handleBidButtonClick);
  });
});
