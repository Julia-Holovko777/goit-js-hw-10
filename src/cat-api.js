import axios from 'axios';
axios.defaults.headers.common['x-api-key'] =
  'live_OqaSbYfRny3ZVMd8ZLXbMIV92lYgGf6BhGOQq6yCaoQQQend9qK2WhD67arJpv5L';

const BASE_URL = 'https://api.thecatapi.com/v1';
const API_KEY = '[x-api-key]';
// 'live_OqaSbYfRny3ZVMd8ZLXbMIV92lYgGf6BhGOQq6yCaoQQQend9qK2WhD67arJpv5L';

function fetchBreeds() {
  return axios
    .get(`${BASE_URL}/breeds?${API_KEY}`)
    .then(responce => {
      return responce.data;
    })
    .catch(error => {
      throw new Error(error);
    });
}

function fetchCatByBreed(breedId) {
  return axios
    .get(`${BASE_URL}/images/search?breed_ids=${breedId}`)
    .then(response => response.data)
    .catch(error => {
      console.log(error);
      throw error;
    });
}

export { fetchBreeds, fetchCatByBreed };
