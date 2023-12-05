import axios from 'axios';
import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';
import '/node_modules/slim-select/dist/slimselect.css';

export async function fetchBreeds(selectEl, loadingEl, errorEl) {
  try {
    const response = await axios.get(`https://api.thecatapi.com/v1/breeds`);
    loadingEl.style.display = 'none';
    response.data.forEach(element => {
      const optionEl = document.createElement('option');
      optionEl.value = element.id;
      optionEl.textContent = element.name;
      selectEl.append(optionEl);
    });
    new SlimSelect({
      select: '#selectElement',
    });
  } catch (error) {
    loadingEl.style.display = 'none';
    selectEl.style.display = 'none';
    errorEl.style.display = 'block';
    Notiflix.Notify.failure(
      'Oops! Something went wrong! Try reloading the page or select another cat breed!',
      {
        position: 'center-center',
        timeout: 5000,
        with: '500px',
        fontSize: '24px',
      }
    );
    throw new Error(error);
  }
}

export async function fetchCatByBreed(
  selectedBreedId,
  selectEl,
  loadingEl,
  errorEl
) {
  try {
    const response = await axios.get(
      `https://api.thecatapi.com/v1/images/search?breed_ids=${selectedBreedId}`
    );
    const item = response.data[0];
    const breedData = item.breeds[0];
    return {
      name: breedData.name,
      description: breedData.description,
      temperament: breedData.temperament,
      imageUrl: item.url,
    };
  } catch (error) {
    loadingEl.style.display = 'none';
    selectEl.style.display = 'none';
    errorEl.style.display = 'block';
    Notiflix.Notify.failure(
      'Oops! Something went wrong! Try reloading the page or select another cat breed!',
      {
        position: 'center-center',
        timeout: 5000,
        with: '500px',
        fontSize: '24px',
      }
    );
    throw error;
  }
}
