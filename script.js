// Simulating Ronin Wallet connection and getting data for the quote
document.getElementById('connect-wallet').addEventListener('click', () => {
    alert("Ronin Wallet connected successfully!");
    // Here you can add the actual wallet connection logic using Ronin Wallet SDK or a similar service
});

document.getElementById('get-quote').addEventListener('click', () => {
    const nftId = document.getElementById('nft-id').value;
    
    // Simulate fetching data about the Axie or Land based on the ID
    if (nftId) {
        // Simulated data for demonstration
        const nftData = {
            name: `Axie #${nftId}`,
            price: (Math.random() * 5).toFixed(3), // Simulated WETH price
            imageUrl: "https://path-to-axie-or-land-image.com"
        };

        // Update the HTML with fetched data
        document.getElementById('nft-name').textContent = nftData.name;
        document.getElementById('nft-price').querySelector('span').textContent = nftData.price;
        document.getElementById('nft-image').src = nftData.imageUrl;
    } else {
        alert('Please enter a valid NFT ID.');
    }
});

document.getElementById('send-nft').addEventListener('click', () => {
    // Simulate sending the NFT to the desired address
    alert("NFT sent successfully!");
    // Here, include the actual smart contract or blockchain transaction logic
});
