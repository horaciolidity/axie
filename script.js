document.getElementById('connect-wallet').addEventListener('click', async () => {
    // Verificar si Ronin Wallet está disponible
    if (window.ethereum && window.ethereum.isRonin) {
        try {
            // Solicitar la conexión a Ronin Wallet
            const accounts = await window.ethereum.request({
                method: 'eth_requestAccounts'
            });

            const walletAddress = accounts[0]; // Obtener la dirección de la cuenta conectada
            alert(`Ronin Wallet connected: ${walletAddress}`);

            // Actualizar el texto del botón para reflejar la conexión
            document.getElementById('connect-wallet').textContent = `Connected: ${walletAddress}`;

        } catch (error) {
            console.error('Error connecting to Ronin Wallet', error);
            alert('Failed to connect to Ronin Wallet');
        }
    } else {
        alert('Ronin Wallet not detected. Please install the Ronin Wallet extension.');
    }
});
