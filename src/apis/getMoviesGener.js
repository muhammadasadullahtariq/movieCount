import { API_KEY, API_URL } from "../constants/apiKeys";

const getMoviesGener = async (id) => {
    try {
        const moviesGener = await fetch(
          `${API_URL}3/movie/${id}?api_key=${API_KEY}`,
        );
        const moviesGenerJson = await moviesGener.json();
        return moviesGenerJson.genres;
    } catch (err) {
        console.log(err);
        return "err";
    }
}

export default getMoviesGener;