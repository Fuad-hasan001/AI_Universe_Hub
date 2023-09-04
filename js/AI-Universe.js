const loadData = async () => {
    const url = `https://openapi.programming-hero.com/api/ai/tools`
    const response = await fetch(url);
    const data = await response.json();
    displayData(data.data.tools);
}

const displayData = (techCards) => {
    console.log(techCards);

    const cardsContainer = document.getElementById('card-container');
    
    techCards.forEach(techCard => {
        console.log(techCard);
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('col');
       
        cardDiv.innerHTML = `
            <div class="card h-100">
                <img  src="${techCard.image}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title fw-bold">Features</h5>
                        <p>
                            <small class="text-body-secondary">1. ${techCard.features[0]}</small> <br>
                            <small class="text-body-secondary">2. ${techCard.features[1]}</small> <br>
                            <small class="text-body-secondary">3. ${techCard.features[2]}</small>
                        </p>    
                </div>
                <div class="card-footer">
                    <h5 class="card-title">${techCard.name}</h5>
                    <small class="text-body-secondary"><i class="bi bi-calendar3"></i> ${techCard.published_in}</small>

                    <!--modal Button trigger  -->
                    <div class ="position-absolute bottom-0 end-0">
                        <button onclick = "loadModalData('${techCard.id}')" type="button" class="btn text-danger text-opacity-75 fs-3 border border-0"  data-bs-toggle="modal" data-bs-target="#cardDetails">
                        <small><i class="bi bi-arrow-right-circle-fill"></i></small>
                        </button>
                    </div>
                </div>
            </div>
        `
        cardsContainer.appendChild(cardDiv);

    });
    // loader stop 
    toggleSpinner(false);
}



toggleSpinner(true)