import {API_KEY, API_URL} from '../constants/apiKeys';

const searchDramas = async (query, page) => {
  try {
    const dramas = await fetch(
      `${API_URL}3/search/tv?api_key=${API_KEY}&query=${query}&page=${page}`,
    );
    const dramasJson = await dramas.json();
    return dramasJson;
  } catch (err) {
    console.log(err);
    return 'err';
  }
};

export default searchDramas;
