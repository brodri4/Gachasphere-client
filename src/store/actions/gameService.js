import axios from "axios";
import { serverLink } from "../../utils/serverLink";

export const gameService = {
    fetchRatings
}

const link = serverLink();

function fetchRatings() {
    return axios.get(`${link}/games/my-ratings`)
}