import { API_KEY, API_URL } from "../constants/apiKeys";

const getMoviesCast = async (id) => {
    try {
        const moviesCast = await fetch(
        `${API_URL}3/movie/${id}/credits?api_key=${API_KEY}`
        );
        const moviesCastJson = await moviesCast.json();
        return moviesCastJson;
    } catch (err) {
        console.log(err);
        return "err";
    }
}
    
export default getMoviesCast;