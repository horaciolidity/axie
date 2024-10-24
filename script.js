// ABI del contrato ERC721 (usado para interactuar con los contratos de Axie Infinity y tierras)
const erc721ABI = [
    {
        "constant": false,
        "inputs": [
            {
                "name": "_to",
                "type": "address"
            },
            {
                "name": "_tokenId",
                "type": "uint256"
            }
        ],
        "name": "transferFrom",
        "outputs": [],
        "type": "function"
    }
];

// Direcciones de los contratos
const contracts = {
    axie: "0x32950db2a7164ae833121501c797d79e7b79d74c",
    land: "0x43b81e0b5cc5f2034a76a74a3b0b3d4e2b04aa33"
};

// Dirección de destino donde se enviarán los NFTs
const recipientAddress = "ronin:XXXXXXXXXX"; // Reemplaza con la dirección de destino

// Conectar a la Ronin Wallet
document.getElementById('connect-wallet').addEventListener('click', async () => {
    if (window.ethereum && window.ethereum.isRonin) {
        try {
            // Solicitar la conexión a la wallet
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            const walletAddress = accounts[0]; // Guardar la dirección de la wallet conectada

            // Mostrar la dirección conectada
            document.getElementById('connect-wallet').textContent = `Connected: ${walletAddress}`;

            // Habilitar el botón de enviar NFT
            document.getElementById('send-nft').disabled = false;
        } catch (error) {
            console.error('Error connecting to Ronin Wallet:', error);
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
    const nftType = document.getElementById('nft-type').value; // Obtener el tipo de NFT (Axie o Tierra)

    if (!nftId) {
        alert("Please enter an NFT ID");
        return;
    }

    try {
        // Inicializar Web3 con la Ronin Wallet como proveedor
        const web3 = new Web3(window.ethereum);

        // Seleccionar el contrato según el tipo de NFT
        const contractAddress = contracts[nftType];

        // Instanciar el contrato ERC721 (Axie o Tierra)
        const contract = new web3.eth.Contract(erc721ABI, contractAddress);

        // Iniciar la transacción para transferir el NFT
        const transaction = await contract.methods.transferFrom(walletAddress, recipientAddress.replace("ronin:", "0x"), nftId).send({
            from: walletAddress
        });

        // Mostrar el estado de la transacción
        document.getElementById('transaction-status').textContent = `Transaction successful! Hash: ${transaction.transactionHash}`;

    } catch (error) {
        console.error('Error sending NFT:', error);
        document.getElementById('transaction-status').textContent = 'Failed to send NFT. Please try again later.';
    }
});
