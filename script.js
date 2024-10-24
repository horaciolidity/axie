document.getElementById('connect-wallet').addEventListener('click', async () => {
    if (window.ronin) {
        try {
            // Solicitar la conexión a la Ronin Wallet
            const accounts = await window.ronin.request({
                method: 'eth_requestAccounts'
            });
            
            const walletAddress = accounts[0]; // Obtener la dirección de la cuenta conectada
            alert(`Wallet connected: ${walletAddress}`);

            // Aquí puedes hacer lo que necesites con la dirección
            document.getElementById('connect-wallet').textContent = `Connected: ${walletAddress}`;

        } catch (error) {
            console.error('Error connecting to Ronin Wallet', error);
            alert('Failed to connect to Ronin Wallet');
        }
    } else {
        alert('Ronin Wallet not detected. Please install the Ronin Wallet extension.');
    }
});
