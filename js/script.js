console.log(window)

/*fetch("https://striveschool-api.herokuapp.com/api/put-your-endpoint-here/", {
headers: {
"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTc4NWQ0MDI2NzYxNDAwMTgzYzJlYWUiLCJpYXQiOjE3MDIzODcwMDgsImV4cCI6MTcwMzU5NjYwOH0.SPYZWut_nYM6_QUQL0K48jcLKa_yNjMjAv5fVRXKS6g"
}
})*/

class Product {
    constructor(name, price, description, brand, imageUrl,) {
        this.name = name;
        this.description = description;
        this.brand = brand;
        this.imageUrl = imageUrl;
        this.price = price;
    }
}

let endpoint = "https://striveschool-api.herokuapp.com/api/product/";

function getData(endpoint) {
    fetch(endpoint, {
        method: "GET",
        headers: {
            Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTc4NWQ0MDI2NzYxNDAwMTgzYzJlYWUiLCJpYXQiOjE3MDIzODcwMDgsImV4cCI6MTcwMzU5NjYwOH0.SPYZWut_nYM6_QUQL0K48jcLKa_yNjMjAv5fVRXKS6g"
        }
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch(err => console.log(err));
}

document.addEventListener("DOMContentLoaded", async () => {
    if (window.location.pathname.includes('index.html')) {
        getData(endpoint);
        createProductCards();
    }
    getData(endpoint);
    if (window.location.pathname.includes('backoffice.html')) {
        document.querySelector("#addItem").addEventListener('click', () => {addNewProductCard()});
    }
});

function postData(data, endpoint) {
    fetch(endpoint, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTc4NWQ0MDI2NzYxNDAwMTgzYzJlYWUiLCJpYXQiOjE3MDIzODcwMDgsImV4cCI6MTcwMzU5NjYwOH0.SPYZWut_nYM6_QUQL0K48jcLKa_yNjMjAv5fVRXKS6g"
        },
        
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(err => console.log(err))
}

function addNewProductCard() {
    let nome = document.querySelector('#name').value;
    console.log(nome);
    let marca = document.querySelector('#brand').value;
    console.log(marca);
    let descrizione = document.querySelector('#description').value;
    let prezzo = document.querySelector('#price').value;
    let immagine = document.querySelector('#imageUrl').value;
    let p = new Product(nome, prezzo, descrizione, marca, immagine);
    console.log(p);
    postData(p, endpoint);
}

function createProductCards() {
    let container = document.querySelector("div#containerCards");
    fetch(endpoint, {
        method: "GET",
    headers: {
    Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTc4NWQ0MDI2NzYxNDAwMTgzYzJlYWUiLCJpYXQiOjE3MDIzODcwMDgsImV4cCI6MTcwMzU5NjYwOH0.SPYZWut_nYM6_QUQL0K48jcLKa_yNjMjAv5fVRXKS6g"
        }
    })
    .then(response => response.json())
    .then(data => data.forEach(element => {
            let card = `
                <div class="p-0" style="width: 30%;">
                    <div class="card h-100 border border-warning pt-1 bg-dark">
                        <a class="text-decoration-none d-flex flex-column p-0" style="width: auto;">
                            <img src="${element.imageUrl}" class="card-img-top rounded-3 m-2" alt="${element.name}" style="height: 300px; width: auto; object-fit: cover;">
                            <div class="card-body p-0 rounded-bottom-3 btn btn-opacity m-2" style="height: 200px; width: auto;">
                                <p class="nameClass card-title fs-3 text-white fw-semibold border-bottom border-warning p-2 mb-0">${element.name}</p>
                                <p class="descriptionClass card-text">${element.description}</p>
                                <p class="brandClass card-text text-secondary">${element.brand}</p>
                                <p class="priceClass card-text fs-4 text-warning">€ ${element.price},00</p>
                            </div>
                        </a>
                        <a onClick="riempiMain()" class="goToDetails btn btn-warning my-2 mx-5">Dettagli Prodotto</a>
                    </div>
                </div>`;
            container.innerHTML += card;
        }))
        .catch(err => console.log(err));
}

document.getElementById("removeAll").addEventListener('click', () => {
    let idArray = [];
  
    fetch(endpoint, {
      method: "GET",
      headers: {
        Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTc4NWQ0MDI2NzYxNDAwMTgzYzJlYWUiLCJpYXQiOjE3MDIzODcwMDgsImV4cCI6MTcwMzU5NjYwOH0.SPYZWut_nYM6_QUQL0K48jcLKa_yNjMjAv5fVRXKS6g"
      }
    })
      .then(response => response.json())
      .then(data => {
        idArray = data.map(item => item._id);
  
        idArray.forEach(id => {
          fetch(`${endpoint}/${id}`, {
            method: "DELETE",
            headers: {
              Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTc4NWQ0MDI2NzYxNDAwMTgzYzJlYWUiLCJpYXQiOjE3MDIzODcwMDgsImV4cCI6MTcwMzU5NjYwOH0.SPYZWut_nYM6_QUQL0K48jcLKa_yNjMjAv5fVRXKS6g"
            }
          })
            .then(response => response)
            .catch(err => console.log(err));
        });
  
        idArray = [];
      })
      .catch(err => console.log(err));
  });

  document.getElementById("clearButton").addEventListener("click", clearForm);

  function clearForm() {
    const inputs = document.getElementsByClassName("add-item");
    for (let i = 0; i < inputs.length; i++) {
      inputs[i].value = "";
    }
  }

  
  function riempiMain() {
    const card = document.querySelector('.card');
    const element = {
      imageUrl: card.querySelector('.card-img-top').getAttribute('src'),
      name: card.querySelector('.nameClass').textContent,
      description: card.querySelector('.descriptionClass').textContent,
      brand: card.querySelector('.brandClass').textContent,
      price: card.querySelector('.priceClass').textContent.replace('€', '').replace(',00', '').trim()
    };
  
    const mainContent = `
    <div class="container-fluid d-flex">
        <img id="productImg" src="${element.imageUrl}" alt="${element.name}" style="width: 40%;">
        <div class="mt-3 ms-3 d-flex flex-column" style="width: 45%;"> <!--PRODOTTO-->
        <h1 class="text-warning fs-1 ms-2">${element.name}</h1>
        <div class="text-white bg-secondary bg-opacity-25 rounded-3 p-3 d-flex justify-content-between"> 
            <div class="d-flex flex-column me-2" style="width: 20%;">
            <p class="bg-dark rounded-3 p-2">€ ${element.price},00</p>
            <div class="bg-warning bg-opacity-25 rounded-3 px-2 pt-2">
                <p class="fw-light">Spedizione: <span class="fw-semibold text-warning d-block mt-1"><img src="img/logo crudazon.png" alt="logo" style="width: 2rem;">Prime</span></p>
            </div>
            <div class="d-flex justify-content-between mx-2">
                <a href="#"><button class="btn btn-warning mt-3 fw-semibold"><i class="bi bi-cart-plus"></i></button></a>
                <a href="#"><button class="btn btn-outline-warning mt-3 fw-semibold"><i class="bi bi-heart"></i></button></a>
            </div>
            </div>
            <div class="border-start border-warning ms-2" style="width: 80%;">
            <p class="p-2 ms-2 mb-0 fw-light">${element.brand}</p>
            <p class="bg-dark rounded-3 p-2 ms-3">${element.description}</p>
            </div>
        </div>
        </div>
    </div>
    `;
  
    const main = document.querySelector('main');
    main.innerHTML = mainContent;
  }