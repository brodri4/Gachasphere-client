import axios from "axios";
import { serverLink } from "../../utils/serverLink";

export const gameService = {
    createRating,
    fetchGames,
    fetchRatings,
    fetchSingleRating,
    updateRating,
    deleteRating
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

function fetchSingleRating(id) {
    return axios.get(`${link}/games/single-rating/${id}`)
}

function updateRating(rating) {
    return axios.post(`${link}/games/update-rating/${rating.ratingId}`, {
        gameId: rating.gameId,
        gameplayRating: rating.gameplayRating,
        f2pRating: rating.f2pRating,
        playing: rating.playing
    })
}

function deleteRating(id) {
    return axios.delete(`${link}/games/delete-rating/${id}`)
}