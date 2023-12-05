import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
import axios from 'axios';
axios.defaults.headers.common['x-api-key'] =
  'live_OqaSbYfRny3ZVMd8ZLXbMIV92lYgGf6BhGOQq6yCaoQQQend9qK2WhD67arJpv5L';

const selectEl = document.querySelector('.breed-select');
const loadingEl = document.querySelector('.loader');
const catInfoEl = document.querySelector('.cat-info');
const errorEl = document.querySelector('.error');

loadingEl.style.display = 'block';

fetchBreeds(selectEl, loadingEl, errorEl);

selectEl.addEventListener('change', handleSelectChange);

async function handleSelectChange() {
  const selectedBreedId = selectEl.value;

  catInfoEl.style.display = 'none';
  loadingEl.style.display = 'block';

  try {
    const catData = await fetchCatByBreed(
      selectedBreedId,
      selectEl,
      loadingEl,
      errorEl
    );

    createMarkup(catData);
    catInfoEl.style.display = 'flex';
  } catch (error) {
    console.error(error);
    alert('Oops! Something went wrong! please try again later.');
  } finally {
    loadingEl.style.display = 'none';
  }
}

function createMarkup({ name, description, temperament, imageUrl }) {
  const markup = `<img class="cat-img" style="object-fit: cover; border-radius: 16px" src="${imageUrl}" alt="${name}" width="400" height="300">
  <div class="box" style="width: 500px; paddingLeft= 100px">
    <h1>${name}</h1>
    <p>${description}</p>
    <h2>Temperament:</h2>
    <p>${temperament}</p> 
  </div>`;
  catInfoEl.innerHTML = markup;
  catInfoEl.style.boxShadow =
    '0 2px 5px rgba(0, 0, 0, 0.2), 0 4px 6px rgba(0, 0, 0, 0.2)';
}
