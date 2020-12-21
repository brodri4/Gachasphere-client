import axios from "axios";
import { serverLink } from "../../utils/serverLink";

export const gameService = {
    fetchGames,
    fetchRatings
}

const link = serverLink();

function fetchGames() {
    return axios.get(`${link}/games/`)
}

function fetchRatings() {
    return axios.get(`${link}/games/my-ratings`)
}