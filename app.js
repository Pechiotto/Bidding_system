
document.addEventListener('DOMContentLoaded', () => {
  const bidButtons = document.querySelectorAll('[data-bid]');
  bidButtons.forEach((button) => {
    button.addEventListener('click', () => {
      showResponderTable(button.dataset.bid);
    });
  });
});

const responseTables = {
  '1C':
  {
    title: '1C Responder Bids',
    bids: [
      { bid: '1♦', description: '0-6(7); any/8-11 unbal no 4M' },
      { bid: '1♥', description: '7+; 4+!H' },
      { bid: '1♠', description: '7+; 4+!S' },
      { bid: '1N', description: '8-10; bal,no 4M' }
    ]
  },
  '1D': {
    title: '1D Responder Bids',
    bids: [
      { bid: '1♥', description: '4+!H' },
      { bid: '1♠', description: '4+!S' },
      { bid: '1N', description: '7-10; possible 6!C' },
      { bid: '2♣', description: '10+; 5+!C' }
    ]
  }
};

function showResponderTable(openerBid) {
  const biddingTable = document.getElementById('biddingTable');
  const responseTableData = responseTables[openerBid];
  if (!responseTableData) return;

  let tableHtml = `
    <tr>
      <th>bid</th>
      <th>description</th>
    </tr>
  `;

  for (const response of responseTableData.bids) {
    tableHtml += `
      <tr>
        <td><button class="${suitClass(response.bid)}" onclick="showNextResponseTable('${response.bid}')">${response.bid}</button></td>
        <td>${response.description}</td>
      </tr>
    `;
  }

  biddingTable.innerHTML = tableHtml;
}



function suitClass(bid) {
  const suit = bid.slice(-1);
  switch (suit) {
    case '♣':
      return 'club';
    case '♦':
      return 'diamond';
    case '♥':
      return 'heart';
    case '♠':
      return 'spade';
    default:
      return '';
  }
}

function showNextResponseTable(responseBid) {
  // 次の応答のテーブルを表示するためのロジックをここに追加してください。
}


