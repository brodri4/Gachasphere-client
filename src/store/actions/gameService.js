import axios from "axios";
import { setAuthenticationHeader } from "../../utils/authenticate";
import { serverLink } from "../../utils/serverLink";

export const gameService = {
  createRating,
  fetchGames,
  fetchRatings,
  fetchSingleRating,
  updateRating,
  deleteRating,
  fetchlistGames,
};

const link = serverLink();

function createRating(rating) {
  let JWT = localStorage.getItem("jsonwebtoken");
  setAuthenticationHeader(JWT);

  return axios.post(`${link}/games/create-rating`, {
    gameId: parseFloat(rating.gameId),
    gameplayRating: parseFloat(rating.gameplayRating),
    f2pRating: parseFloat(rating.f2pRating),
    playing: rating.playing,
  });
}

function fetchGames() {
  let JWT = localStorage.getItem("jsonwebtoken");
  setAuthenticationHeader(JWT);

  return axios.get(`${link}/games/`);
}

function fetchlistGames(id) {
  return axios.get(`http://localhost:8080/lists/gameList/${id}`);
}

function fetchRatings() {
  let JWT = localStorage.getItem("jsonwebtoken");
  setAuthenticationHeader(JWT);

  return axios.get(`${link}/games/my-ratings`);
}

function fetchSingleRating(id) {
  let JWT = localStorage.getItem("jsonwebtoken");
  setAuthenticationHeader(JWT);

  return axios.get(`${link}/games/single-rating/${id}`);
}

function updateRating(rating) {
  let JWT = localStorage.getItem("jsonwebtoken");
  setAuthenticationHeader(JWT);

  return axios.post(`${link}/games/update-rating/${rating.ratingId}`, {
    gameId: rating.gameId,
    gameplayRating: rating.gameplayRating,
    f2pRating: rating.f2pRating,
    playing: rating.playing,
  });
}

function deleteRating(id) {
  let JWT = localStorage.getItem("jsonwebtoken");
  setAuthenticationHeader(JWT);

  return axios.delete(`${link}/games/delete-rating/${id}`);
}
