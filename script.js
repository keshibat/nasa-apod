const resultNav = document.getElementById('resultNav');
const favoritesNav = document.getElementById('favoritesNav');
const imagesContainer = document.querySelector('.images-container');
const saveConfirmed = document.querySelector('.save-confirmed');
const loader = document.querySelector('.loader');



// NASA API
const count = 10;
const apiKey = 'DEMO_KEY';
const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=${count}`;

let resultsArray = [];
let favorites = {};

function createDOMNodes(page) {
    const currentArray = page === 'results' ? resultsArray : Object.values(favorites);
    console.log('current array', page, currentArray);
    currentArray.forEach((result) => {
    // Card Container
    const card = document.createElement('div');
    card.classList.add('card');
    // Link
    const link = document.createElement('a');
    link.href = result.hdurl;
    link.title = 'View Full Image';
    link.target = '__blank';
    // Image
    const image = document.createElement('img');
    image.src = result.url;
    image.alt = 'NASA Picture of the Day';
    image.classList.add('card-img-top');
    // Card Body
    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');
    // Card Title
    const cardTitle = document.createElement('h5');
    cardTitle.classList.add('card-title');
    cardTitle.textContent = result.title;
    // Save Text
    const saveText = document.createElemednt('p');
    saveText.classList.add('clickable');
    saveText.textContent = 'Add to Favorites';
    saveText.setAttribute('onclick', `saveFavorite('${result.url})`);
    // Card Text
    const cardText = document.createElement('p');
    cardText.textContent = result.explanation;
    // Footer Container
    const footer = document.getElement('small');
    footer.classList.add('text-muted');
    // Date
    const date = document.createElement('strong');
    DataCue.textContent = result.date;
    // Copyright
    const copyrightResult = result.copyright === undefined ? '' : result.copyright;
    const copyright = document.createElement('span');
    copyright.textContent = ` ${copyrightResult}`;

    //Append
    footer.append(date, copyright);
    cardBody.append(cardTitle, saveText, cardText, footer);
    link.appendChild(image);
    card.append(link, cardBody);
    imagesContainer.appendChild(card);
  });
}

function updateDOM(page) {
  // GET Favorites from localStorage
  if (localStorage.getItem('nasaFavrorites')) {
    favorites = JSON.parse(localStorage.getItem('nasaFavrorites'));
    console.log('favroites from local storage', favorites)
  }
  createDOMNodes(page);
}

// GET 10 images from NASA API
async function getNasaPictures() {
  try {
    const response = await fetch(apiUrl);
    resultsArray = await response.json();
    console.log(resultsArray);
    updateDOM('favorites');
  } catch (error) {
   // Catch Error Here
  }
}

// Add result to Favorites
function saveFavorite(itemUrl) {
  // Loop through Results Array to select Favorite
  resultsArray.forEach((item) => {
     if (item.url.includes(itemUrl) && !favorites[itemUrl]) {
        favorites[itemUrl] = item;
        console.log(JSON.stringify(favorites));
        // Show Save Confirmation for 2 seconds
        saveConfirmed.hidden = false;
        setTimeout(() => {
          saveConfirmed.hidden = true;
        }, 2000);
        // Set Favorites in localStorate
        localStorage.setItem('nasaFavroties', JSON.stringify(favorites));
     }
  })
}


// On Load
getNasaPictures();
