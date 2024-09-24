import axios from 'axios';

const API_KEY = import.meta.env.VITE_GIPHY_API_KEY;
const BASE_URL = 'https://api.giphy.com/v1/gifs';

export const fetchTrendingGifs = (limit: number, offset: number) => {
  return axios.get(`${BASE_URL}/trending`, {
    params: {
      api_key: API_KEY,
      limit,
      offset,
    },
  });
};

export const searchGifs = (query: string, limit: number, offset: number) => {
  return axios.get(`${BASE_URL}/search`, {
    params: {
      api_key: API_KEY,
      q: query,
      limit,
      offset,
    },
  });
};
