import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const API_KEY = '35144361-9ec03ce098d095dbb4bda03de';
const perPage = 12;

export const fetchPictures = async (keyword, page) => {
  try {
    const response = await axios.get('', {
      params: {
        key: API_KEY,
        q: keyword,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page,
        per_page: perPage,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const normalizedImages = imagesArray =>
  imagesArray.map(({ id, tags, webformatURL, largeImageURL }) => ({
    id,
    tags,
    webformatURL,
    largeImageURL,
  }));

export { perPage };