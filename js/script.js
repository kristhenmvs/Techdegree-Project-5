// Global variables.
const url = 'https://randomuser.me/api/?format=json&results=12';
const gallery = document.querySelector('#gallery');
const body = document.querySelector('body');
let users = [];

// Fetch request with the function calling and error message.
fetch(url)
.then(checkStatus)
.then(res => res.json())
.then(data => {createGallery(data), createModalWindow(data)})
.then(eventHandler)
.catch(error => console.log('Looks like there was a problem. ', error));

// To check if the request succeded.
function checkStatus(response) {
    if (response.ok) {
        return Promise.resolve(response);
    } else {
        return Promise.reject(new Error(response.statusText));
    }
}

// To create the gallery of employees as the page loads.
function createGallery(data){
    const gallery = document.querySelector('#gallery')
    let randomUsers = data.results;

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
            </div>
        `;

        gallery.innerHTML += galleryHtml;
    });
    
}

// To create the modal windows of every employee and append them to the document.
function createModalWindow(data){
    
    let randomUser = data.results;
    const modalDiv = document.createElement('div');
    modalDiv.className = 'modal-container';
    modalDiv.style.display = 'none';

    randomUser.forEach( user => {

        const birthDay = user.dob.date.substring(8, 10);
        const birthMonth = user.dob.date.substring(5, 7);
        const birthYear = user.dob.date.substring(0, 4);
        const modalHtml = `
            <div class="modal" style="display:none">
                <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                <div class="modal-info-container">
                    <img class="modal-img" src="${user.picture.large}" alt="profile picture">
                    <h3 id="name" class="modal-name cap">${user.name.first} ${user.name.last}</h3>
                    <p class="modal-text">${user.email}</p>
                    <p class="modal-text cap">${user.location.city}</p>
                    <hr>
                    <p class="modal-text">${user.cell}</p>
                    <p class="modal-text">${user.location.street.number} ${user.location.street.name}, ${user.location.city}, ${user.location.state} ${user.location.postcode}</p>
                    <p class="modal-text">Birthday: ${birthMonth}/${birthDay}/${birthYear}</p>
                </div>
            </div>    
            
        `;
        
        modalDiv.innerHTML += modalHtml;
        

    });
    gallery.after(modalDiv);
    
}

// To take care of the event handlers.
function eventHandler () {
    const gallery = document.querySelector('#gallery');
    const cards = Array.from(document.querySelectorAll('.card'));
    const modalCards = Array.from(document.querySelectorAll('.modal'));
    const modalDiv = document.querySelector('.modal-container');
    

    gallery.addEventListener('click', (e) => {
        
        if (e.target.className === 'card'){
           
            let i = cards.indexOf(e.target);
            modalCards[i].style.display = '';
            modalDiv.style.display = '';


            const btn = document.querySelectorAll('#modal-close-btn');
            btn[i].addEventListener('click', () => {
            modalDiv.style.display = 'none'
            modalCards[i].style.display = 'none'
            })
        } else if (e.target.className === 'card-name cap' || e.target.className === 'card-img' || e.target.className === 'card-text' || e.target.className === 'card-text cap'){

            let i = cards.indexOf(e.target.parentNode.parentNode);
            modalCards[i].style.display = '';
            modalDiv.style.display = '';


            const btn = document.querySelectorAll('#modal-close-btn');
            btn[i].addEventListener('click', () => {
            modalDiv.style.display = 'none'
            modalCards[i].style.display = 'none'
            })
        }
    })
}
