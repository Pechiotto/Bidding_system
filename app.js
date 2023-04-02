document.addEventListener('DOMContentLoaded', () => {
    // ここに対話機能のコードを書く

    const biddingHistory = [];

    const biddingForm = document.getElementById('bidding-form');
    biddingForm.addEventListener('submit', handleBidding);

    function handleBidding(event) {
        event.preventDefault();
        const bidInput = document.getElementById('bid');
        const bid = bidInput.value;

        // バリデーションとエラーチェックを実装する（オプション）

        // ビディング履歴に追加
        biddingHistory.push({ player: 'South', bid });

        // ビディングテーブルを更新
        updateBiddingTable();

        // 入力をクリア
        bidInput.value = '';
    }

    function updateBiddingTable() {
        const biddingTableBody = document.querySelector('#bidding-table tbody');
        biddingTableBody.innerHTML = '';

        biddingHistory.forEach((bidData, index) => {
            if (index % 4 === 0) {
                const newRow = biddingTableBody.insertRow();
                newRow.insertCell().textContent = bidData.bid;
            } else {
                const lastRow = biddingTableBody.rows[biddingTableBody.rows.length - 1];
                lastRow.insertCell().textContent = bidData.bid;
            }
        });
    }

    function isValidBid(bid) {
        const validBidPattern = /^([1-7][♣♦♥♠]|pass|double|redouble)$/i;
        return validBidPattern.test(bid);
      }
      
      function handleBidding(event) {
        event.preventDefault();
        const bidInput = document.getElementById('bid');
        const bid = bidInput.value;
      
        if (!isValidBid(bid)) {
          alert('無効なビディングです。');
          return;
        }
      
        // 以降の処理は同じ
      }

});
