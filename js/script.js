// Global variables.
const url = 'https://randomuser.me/api/?format=json&results=12';
const gallery = document.querySelector('#gallery');
const body = document.querySelector('body');
let users = [];

// Fetch request.

fetch(url)
.then(checkStatus)
.then(res => res.json())
.then(data => createGallery(data))
.then(data => createModalWindow(data))
.catch(error => console.log('Looks like there was a problem. ', error));

// To check if the request succeded.
function checkStatus(response) {
    if (response.ok) {
        return Promise.resolve(response);
    } else {
        return Promise.reject(new Error(response.statusText));
    }
}

function createGallery(data){
    users = data.results;
    let randomUsers = users;

    randomUsers.forEach(user => {
        const galleryHtml = `
            <div class="card">
            <div class="card-img-container">
                <img class="card-img" src="${user.picture.large}" alt="profile picture">
            </div>
            <div class="card-info-container">
                <h3 id="name" class="card-name cap">${user.name.first} ${user.name.last}</h3>
                <p class="card-text">${user.email}</p>
                <p class="card-text cap">${user.location.city}, ${user.location.state}</p>
            </div>
        `;

        gallery.innerHTML += galleryHtml;
    });
    
}

const createModalDiv = document.createElement('div');
    createModalDiv.className = "modal-container"
    body.append(createModalDiv);
    const modalDiv = document.querySelector('.modal-container');
    modalDiv.style.display = 'none';
function createModalWindow(data){
    
    let randomUsers = users;
    
    randomUsers.forEach( user => {

        const birthDay = user.dob.date.substring(8, 10);
        const birthMonth = user.dob.date.substring(5, 7);
        const birthYear = user.dob.date.substring(0, 4);
        const modalHtml = `
            <div class="modal">
                <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                <div class="modal-info-container">
                    <img class="modal-img" src="${user.picture.large}" alt="profile picture">
                    <h3 id="name" class="modal-name cap">${user.name.first} ${user.name.last}</h3>
                    <p class="modal-text">${user.email}</p>
                    <p class="modal-text cap">${user.location.city}</p>
                    <hr>
                    <p class="modal-text">${user.cell}</p>
                    <p class="modal-text">${user.location.street}, ${user.location.city}, ${user.location.state} ${user.location.postcode}</p>
                    <p class="modal-text">Birthday: ${birthMonth}/${birthDay}/${birthYear}</p>
                </div>
            </div>    
            
        `;
        modalDiv.innerHTML += modalHtml;
        
              
    });

    body.appendChild(modalDiv);

    
}

const card = document.querySelectorAll('.card');
for (let i = 0 ; i < card.length; i++) {
    card[i].addEventListener('click' , (e)=> {
        modalDiv.style.display = '';
        e.style.display = '';
        createModalWindow();
    });
}
