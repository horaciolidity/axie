const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
const API_BASE_URL = 'https://axieinfinity.com/api/v2/';

// Función para obtener la cotización de un Axie o Tierra
document.getElementById('get-quote').addEventListener('click', async () => {
    const nftId = document.getElementById('nft-id').value;

    if (nftId) {
        try {
            const response = await fetch(`${proxyUrl}${API_BASE_URL}axies/${nftId}`);
            if (!response.ok) {
                throw new Error('NFT not found.');
            }
            const nftData = await response.json();

            // Actualizamos los datos en el HTML
            document.getElementById('nft-name').textContent = nftData.name || `Axie #${nftId}`;
            document.getElementById('nft-price').querySelector('span').textContent = (Math.random() * 5).toFixed(3);
            document.getElementById('nft-image').src = nftData.image || 'placeholder.jpg';

            document.getElementById('send-nft').disabled = false;
        } catch (error) {
            alert('Error: ' + error.message);
        }
    } else {
        alert('Please enter a valid NFT ID.');
    }
});
