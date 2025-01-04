import axios from "axios";

const fetchMovies = async (query) => {
    const API_KEY = "6d9e9765";
    const response = await axios.get(
      `https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`
    );
    return response.data;
}


export default fetchMovies