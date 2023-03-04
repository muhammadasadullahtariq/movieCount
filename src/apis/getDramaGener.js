import { API_KEY, API_URL } from "../constants/apiKeys";

const getDramaGener = async (id, page) => {
    try {
        const dramaGener = await fetch(
          `${API_URL}3/tv/${id}?api_key=${API_KEY}`,
        );
        const dramaGenerJson = await dramaGener.json();
        return dramaGenerJson;
    } catch (err) {
        console.log(err);
        return "err";
    }
}

export default getDramaGener;