import axios from "axios";

export const BASE_URL = "https://api.themoviedb.org/3";
export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/original/';
const API_KEY = '2bd3269ef45e7973d36c59e765c53779';


const options = {
  params: {
    'api_key':API_KEY
  }
};

export const fetchFromAPI = async(url) => {
    const {data} = await axios.get(`${BASE_URL}/${url}`, options)
    return data;
}


// const trendingUrl = `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`;
