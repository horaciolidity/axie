const API_BASE_URL = 'https://axieinfinity.com/api/v2/';

// Función para conectar la Ronin Wallet
document.getElementById('connect-wallet').addEventListener('click', () => {
    // Aquí iría el código para conectar la Ronin Wallet
    alert("Ronin Wallet connected successfully!");
    // Lógica de conexión real con Ronin Wallet SDK
});

// Función para obtener la cotización de un Axie o Tierra
document.getElementById('get-quote').addEventListener('click', async () => {
    const nftId = document.getElementById('nft-id').value;

    if (nftId) {
        try {
            // Llamada a la API de Axie Infinity para obtener los detalles del NFT
            const response = await fetch(`${API_BASE_URL}axies/${nftId}`);
            if (!response.ok) {
                throw new Error('NFT not found.');
            }
            const nftData = await response.json();

            // Actualizamos los datos en el HTML
            document.getElementById('nft-name').textContent = nftData.name || `Axie #${nftId}`;
            document.getElementById('nft-price').querySelector('span').textContent = (Math.random() * 5).toFixed(3); // Aquí puede ir una cotización real en WETH si tienes un servicio de cotización
            document.getElementById('nft-image').src = nftData.image || 'placeholder.jpg';

            // Habilitamos el botón de envío si se encontró el NFT
            document.getElementById('send-nft').disabled = false;
        } catch (error) {
            alert('Error: ' + error.message);
        }
    } else {
        alert('Please enter a valid NFT ID.');
    }
});

// Función para enviar el NFT (simulado)
document.getElementById('send-nft').addEventListener('click', () => {
    // Aquí va la lógica de enviar el NFT a una dirección (conectado a la blockchain real)
    alert("NFT sent successfully!");
    // Implementa la lógica real de transacción utilizando Ronin Wallet SDK o smart contracts
});

