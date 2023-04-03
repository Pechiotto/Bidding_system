// ビディング履歴を格納する配列
const biddingHistory = [];

// 追加: BBOアラートテーブルを解析する関数
function parseBBOalertTable(alertTableString) {
  const table = {};

  alertTableString.split(';').forEach((alertString) => {
    const [bidString, alert] = alertString.split('=');
    const bids = bidString.split('/');
    bids.forEach((bid) => {
      table[bid.trim()] = alert.trim();
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
    system[bid.trim()] = response.trim();
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
  const alert = biddingTable[bid];

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

// BBOアラートテーブルの文字列
const bboalertString = '1C=12-14bal/12+!C/18+any; 1D=0-6(7); any/8-11 unbal no 4M';

// BBOアラートテーブルを解析
const biddingTable = parseBBOalertTable(bboalertString);

// ビディングシステムの文字列
const biddingSystemString = `1C, 12-14bal/12+!C/18+any
1D, 0-6(7); any/8-11 unbal no 4M`;

// ビディングシステムを解析
const biddingSystem = parseBiddingSystem(biddingSystemString);

// ボタンのイベントリスナーを設定
document.addEventListener('DOMContentLoaded', () => {
  const bidButtons = document.querySelectorAll('.bid-button');

  bidButtons.forEach((button) => {
    button.addEventListener('click', handleBidButtonClick);
  });
});
