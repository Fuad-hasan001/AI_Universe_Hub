const loadData = async (dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/ai/tools`
    const response = await fetch(url);
    const data = await response.json();
    displayData(data.data.tools, dataLimit);
}

const displayData = (techCards, dataLimit) => {
    console.log(techCards, dataLimit);

    const cardsContainer = document.getElementById('card-container');
    cardsContainer.innerHTML = '';

    // display first 6 data-------------------------------
    /* const showAll = document.getElementById('show-all');
        if (dataLimit && techCards.length > 6) {
            techCards = techCards.slice(0, 6);
            showAll.classList.remove('d-none');

        }
        else {
            showAll.classList.add('d-none');
        } */
    /* const showFirstData = () => {
        const showAll = document.getElementById('show-all');
        if (dataLimit && techCards.length > 6) {
            techCards = techCards.slice(0, 6);
            showAll.classList.remove('d-none');

        }
        else {
            showAll.classList.add('d-none');
        }
        // return console.log(techCards);
        return techCards;
    } 
    // call first data
    showFirstData();
    */

    
    // ---------------individual card display----------
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

/* const process = (dataLimit) =>{
    loadData(dataLimit);
}

document.getElementById('btn-showAll').addEventListener('click', function(){
    console.log("clicked");
    process(6);
}) */



// -----------------Modal Data---------------------------------
const loadModalData = async (id) => {
    console.log(id);

    const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
    const response = await fetch(url);
    const data = await response.json();
    displayModalData(data.data);
}

const displayModalData = (modalData) => {
    console.log(modalData);

    const cardBodyContainer = document.getElementById('card-body-container');
    cardBodyContainer.innerHTML = `
            <h5 class="card-title fw-bold">${modalData.description}</h5>


            <div class="row row-cols-1 row-cols-md-3 g-4 my-3">
            <div class="col">
                <div class="card border border-0">
                    <div class="card-body px-1">
                        <h5 class = "fw-bold text-center text-success">${modalData.pricing[0].price}</h5>
                        <h5 class = "fw-bold text-center text-success">${modalData.pricing[0].plan}</h5>
                    </div> 
                </div>       
            </div>

            <div class="col">
                <div class="card border border-0">
                    <div class="card-body px-1">
                    <h5 class = "fw-bold text-center text-warning">${modalData.pricing[1].price}</h5>
                    <h5 class = "fw-bold text-center text-warning">${modalData.pricing[1].plan}</h5>
                    </div> 
                </div>       
            </div>

            <div class="col">
                <div class="card border border-0">
                    <div class="card-body px-2">
                    <h5 class = "fw-bold text-center text-danger">${modalData.pricing[2].price}</h5>
                    <h5 class = "fw-bold text-center text-danger">${modalData.pricing[2].plan}</h5>
                    </div>
                </div>            
            </div>
        </div>

            <div class="row row-cols-1 row-cols-md-2 g-4">
                <div class="col">
                    <div class="card border border-0 bg-transparent">
                        <div class="card-body">
                            <h5 class = "fw-bold">Features</h5>
                            <p>
                                <li><small class="text-body-secondary">${modalData.features[1].feature_name}</small> <br></li>
                                <li><small class="text-body-secondary">${modalData.features[2].feature_name}</small> <br></li>
                                <li><small class="text-body-secondary">${modalData.features[3].feature_name}</small></li>
                            </p>
                        </div> 
                    </div>       
                </div>

                <div class="col">
                    <div class="card border border-0 bg-transparent">
                        <div class="card-body">
                                <h5 class="fw-bold">integrations</h5>
                                <p>
                                    <li><small class="text-body-secondary">${modalData.integrations[0]}</small> <br></li>
                                    <li><small class="text-body-secondary">${modalData.integrations[1]}</small> <br></li>
                                    <li><small class="text-body-secondary">${modalData.integrations[2]}</small></li>
                                </p>
                        </div>
                    </div>            
                </div>
            </div>
    `
    const modalImageContainer = document.getElementById('modal-image');
    modalImageContainer.innerHTML = `
        <div class="position-relative">
            <button id="btn-accuracy" type="button" class="btn btn-danger fs-5 position-absolute top-0 end-0 mt-2 me-2 badge border border-0 fs-5">
            <span">${modalData.accuracy.score * 100 + '%'}</span> accuracy
            </button>
        </div>
        <img  src="${modalData.image_link[0]}" class="card-img-top" alt="...">

        <div class="card-body text-center">
            <!-- input_output_examples -->
            <h5 class="card-title fw-bold">${modalData.input_output_examples[0].input}</h5>
            <p class="card-text">${modalData.input_output_examples[0].output}</p>
        </div>
    `
}


// function for spinner
const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader')
    if (isLoading) {
        loaderSection.classList.remove('d-none');
    }
    else {
        loaderSection.classList.add('d-none');
    }
}

loadData();
// start loader
toggleSpinner(true)