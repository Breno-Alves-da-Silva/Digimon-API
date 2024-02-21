document.addEventListener('DOMContentLoaded', function() {
    const apiUrl = 'https://digimoncard.io/api-public/getAllCards.php?sort=name&series=Digimon%20Card%20Game&sortdirection=asc';
    const appElement = document.getElementById('app');

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro na solicitação. Código de status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const seisItens = data.slice(0, 6)
            // Exiba as informações das cartas
            displayCards(seisItens);
        })
        .catch(error => {
            console.error('Erro ao obter dados da API:', error.message);
            appElement.innerHTML = `Erro ao carregar dados da API: ${error.message}`;
        });

    function displayCards(cards) {
        // Limpe o conteúdo atual antes de exibir as cartas
        appElement.innerHTML = '';

        // Crie elementos HTML para cada carta e adicione ao DOM
        cards.forEach(card => {
            const cardElement = document.createElement('div');
            cardElement.innerHTML = `<h3>${card.name}</h3>
                                     <p>Número da carta: ${card.cardnumber}</p>`;

            // Adicione o elemento da carta ao contêiner principal
            appElement.appendChild(cardElement);
        });
    }
});
