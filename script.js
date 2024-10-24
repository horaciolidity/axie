document.getElementById('connect-wallet').addEventListener('click', async () => {
    if (window.ethereum && window.ethereum.isRonin) {
        try {
            // Solicitar al usuario que conecte su Ronin Wallet
            const accounts = await window.ethereum.request({
                method: 'eth_requestAccounts'
            });
            const walletAddress = accounts[0]; // Guardar la dirección de la wallet

            // Mostrar la dirección conectada
            document.getElementById('connect-wallet').textContent = `Connected: ${walletAddress}`;

            // Habilitar el botón de enviar NFT
            document.getElementById('send-nft').disabled = false;

        } catch (error) {
            console.error('Error connecting to Ronin Wallet', error);
            alert('Failed to connect to Ronin Wallet');
        }
    } else {
        alert('Ronin Wallet not detected. Please install the Ronin Wallet extension.');
    }
});

// Función para enviar el NFT
document.getElementById('send-nft').addEventListener('click', async () => {
    const walletAddress = document.getElementById('connect-wallet').textContent.split(': ')[1]; // Obtener la dirección conectada
    const nftId = document.getElementById('nft-id').value; // Obtener el ID del NFT
    const recipientAddress = "ronin:XXXXXXXXXX"; // Aquí coloca la dirección de destino

    if (!nftId) {
        alert("Please enter an NFT ID");
        return;
    }

    try {
        // Aquí llamamos a la API o realizamos la transacción (simulación)
        const transactionHash = await sendNFTToAddress(walletAddress, recipientAddress, nftId);

        // Mostrar estado de la transacción
        document.getElementById('transaction-status').textContent = `Transaction successful! Hash: ${transactionHash}`;
    } catch (error) {
        console.error('Error sending NFT:', error);
        document.getElementById('transaction-status').textContent = 'Failed to send NFT. Please try again later.';
    }
});

// Simular la transacción de enviar NFT
async function sendNFTToAddress(fromAddress, toAddress, nftId) {
    // Este código simula una transacción, puedes reemplazarlo con la lógica real
    console.log(`Sending NFT ID ${nftId} from ${fromAddress} to ${toAddress}`);
    
    // Simulación de un hash de transacción
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('0x1234567890abcdef1234567890abcdef');
        }, 2000); // Simula un retraso de 2 segundos
    });
}
