const app = new Vue({
    el:"#app",
    created(){
        const urlParams = new URLSearchParams(window.location.search);
        const paymentID = urlParams.get('transaction_id');
        const orderID   = urlParams.get('tx_ref');
        window.location.href = `http://localhost:8080/buyer/approval/${orderID}/${paymentID}`;
    }
})