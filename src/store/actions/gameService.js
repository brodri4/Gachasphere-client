import axios from "axios";
import { serverLink } from "../../utils/serverLink";

export const gameService = {
    createRating,
    fetchGames,
    fetchRatings
}

const link = serverLink();

function createRating(rating) {
    return axios.post(`${link}/games/create-rating`, {
        gameId: parseFloat(rating.gameId),
        gameplayRating: parseFloat(rating.gameplayRating),
        f2pRating: parseFloat(rating.f2pRating),
        playing: rating.playing
    })
}

function fetchGames() {
    return axios.get(`${link}/games/`)
}

function fetchRatings() {
    return axios.get(`${link}/games/my-ratings`)
}