import { API_KEY, API_URL } from '../constants/apiKeys';

const searchMovies = async (query, page) => {
    try {
        const movies = await fetch(
        `${API_URL}3/search/movie?api_key=${API_KEY}&query=${query}&page=${page}`,
        );
        const moviesJson = await movies.json();
        return moviesJson;
    } catch (err) {
        console.log(err);
        return 'err';
    }
}
    
export default searchMovies;
