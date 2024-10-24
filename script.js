document.getElementById('connect-wallet').addEventListener('click', async () => {
    if (window.ethereum && window.ethereum.isRonin) {
        try {
            // Conexión a la Ronin Wallet
            const accounts = await window.ethereum.request({
                method: 'eth_requestAccounts'
            });
            const walletAddress = accounts[0]; // Dirección de la wallet

            alert(`Ronin Wallet connected: ${walletAddress}`);

            // Mostrar la dirección conectada en el botón
            document.getElementById('connect-wallet').textContent = `Connected: ${walletAddress}`;

            // Llamar a la función para obtener los Axies del usuario
            getAxies(walletAddress);

        } catch (error) {
            console.error('Error connecting to Ronin Wallet', error);
            alert('Failed to connect to Ronin Wallet');
        }
    } else {
        alert('Ronin Wallet not detected. Please install the Ronin Wallet extension.');
    }
});

// Función para obtener Axies del usuario mediante la API de Axie Infinity
async function getAxies(walletAddress) {
    try {
        // Hacer una llamada a la API pública de Axie Infinity para obtener los Axies del usuario
        const response = await fetch(`https://axieinfinity.com/graphql-server-v2/graphql?query={axies(owner:%22ronin:${walletAddress.replace('0x', '')}%22){total,results{id,name,image}}}`);
        const data = await response.json();

        // Mostrar los Axies en la página
        const axies = data.data.axies.results;

        const quoteDisplay = document.querySelector('.quote-display');
        quoteDisplay.innerHTML = ''; // Limpiar el contenido anterior

        // Iterar sobre los Axies y agregarlos al DOM
        axies.forEach(axie => {
            const axieElement = document.createElement('div');
            axieElement.classList.add('axie-item');
            axieElement.innerHTML = `
                <h2>${axie.name || 'Axie #' + axie.id}</h2>
                <img src="${axie.image}" alt="${axie.name}">
                <p>ID: ${axie.id}</p>
            `;
            quoteDisplay.appendChild(axieElement);
        });
    } catch (error) {
        console.error('Error fetching Axies:', error);
        alert('Failed to retrieve Axies. Please try again later.');
    }
}
