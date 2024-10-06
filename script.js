const corsProxy = 'https://cors-anywhere.herokuapp.com/';
const axieAPI = `https://axieinfinity.com/api/v2/axies/`;
const axieAPI = `/api/axie?id=`;

document.getElementById('get-quote').addEventListener('click', async () => {
    const nftId = document.getElementById('nft-id').value;
    if (nftId) {
        try {
            const response = await fetch(`${corsProxy}${axieAPI}${nftId}`);
            const nftData = await response.json();

            document.getElementById('nft-name').textContent = nftData.name || `Axie #${nftId}`;
            document.getElementById('nft-price').querySelector('span').textContent = (Math.random() * 5).toFixed(3);
            document.getElementById('nft-image').src = nftData.image || 'placeholder.jpg';

            document.getElementById('send-nft').disabled = false;
        } catch (error) {
            alert('Error: ' + error.message);
        }
    } else {
        alert('Por favor, ingrese un ID de NFT válido.');
    }
});
