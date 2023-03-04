//get movies list
import {API_KEY, API_URL} from '../constants/apiKeys';

const getMoviesList = async page => {
  try {
    const moviesList=await fetch(
        `${API_URL}3/movie/upcoming?api_key=${API_KEY}&&page=${page}`,
        );
    const moviesListJson = await moviesList.json();
    return moviesListJson;
  } catch (err) {
    console.log(err);
    return 'err';
  }
};

export default getMoviesList;
