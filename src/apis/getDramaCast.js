import { API_KEY, API_URL } from "../constants/apiKeys";

const getDramaCast = async (id) => {
    try {
        const dramaCast = await fetch(
        `${API_URL}3/tv/${id}/credits?api_key=${API_KEY}`
        );
        const dramaCastJson = await dramaCast.json();
        return dramaCastJson;
    } catch (err) {
        console.log(err);
        return "err";
    }
}

export default getDramaCast;