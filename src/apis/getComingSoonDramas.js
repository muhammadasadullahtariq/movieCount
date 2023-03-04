import { API_KEY,API_URL } from "../constants/apiKeys";


const getComingSoonDramas = async (page) => {
    try {
        const comingSoonDramas = await fetch(
        `${API_URL}3/tv/on_the_air?api_key=${API_KEY}&&page=${page}`
        );
        const comingSoonDramasJson = await comingSoonDramas.json();
        return comingSoonDramasJson;
    } catch (err) {
        console.log(err);
        return "err";
    }
}
    
export default getComingSoonDramas;