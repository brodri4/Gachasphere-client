import { gameConstants } from './gameActionTypes';
import { gameService } from './gameService';

export const gameActions = {
    createRating,
    fetchGames,
    fetchRatings,
    fetchSingleRating,
    updateRating
}

function createRating(rating) {
    return dispatch => {
        dispatch(ratingCreateRequested())
        gameService.createRating(rating)
        .then(
            result => {
                if (result.data.ratingCreated) {
                    dispatch(success(result.data))
                } else if (!result.data.ratingCreated) {
                    if (result.data.ratingExists) {
                        dispatch(ratingExists())
                    }
                    dispatch(failure(result.data.message))
                } 
            },
            error => {
                dispatch(failure(error))
            }
        )
    }
    function ratingCreateRequested() {return { type: gameConstants.RATING_CREATE_REQUESTED } }
    function success(result) { return { type: gameConstants.RATING_CREATED, payload: result } }
    function ratingExists() { return {type: gameConstants.RATING_CREATE_FAIL_EXISTS } }
    function failure(error) { return { type: gameConstants.RATING_CREATE_FAIL, payload: error } }
}

function fetchGames() {
    return dispatch => {
        gameService.fetchGames()
        .then(
            result => {
                if (result.data) {
                    dispatch(success(result.data))
                } else if (!result.data) {
                    let error = "Something went wrong - ratings not loaded."
                    dispatch(failure(error))
                }
            },
            error => {
                dispatch(failure(error))
            }
        )
    }

    function success(result) { return { type: gameConstants.GAMES_FETCHED, payload: result } }
    function failure(error) { return { type: gameConstants.GAME_FETCH_FAIL, payload: error } }
}

function fetchRatings() {
    return dispatch => {
        gameService.fetchRatings()
        .then(
            result => {
                if (result.data) {
                    dispatch(success(result.data))
                } else if (!result.data) {
                    let error = "Something went wrong - ratings not loaded."
                    dispatch(failure(error))
                }
            },
            error => {
                dispatch(failure(error))
            }
        )
    }

    function success(result) { return { type: gameConstants.RATINGS_FETCHED, payload: result } }
    function failure(error) { return { type: gameConstants.RATING_FETCH_FAIL, payload: error } }
}

function fetchSingleRating(id) {
    return dispatch => {
        dispatch(loading())
        gameService.fetchSingleRating(id)
        .then(
            result => {
                if (result.data) {
                    dispatch(success(result.data))
                } else if (!result.data) {
                    let error = "Something went wrong - rating not loaded."
                    dispatch(failure(error))
                }
            },
            error => {
                dispatch(failure(error))
            }
        )
    }

    function loading() { return { type: gameConstants.SINGLE_RATING_LOADING } }
    function success(result) { return { type: gameConstants.SINGLE_RATING_FETCHED, payload: result } }
    function failure(error) { return { type: gameConstants.SINGLE_RATING_FETCH_FAIL, payload: error } }
}

function updateRating(rating) {
    return dispatch => {
        dispatch(loading())
        gameService.updateRating(rating)
        .then(
            result => {
                if (result.data) {
                    dispatch(success(result.data))
                } else if (!result.data) {
                    let error = "Something went wrong - rating not updated."
                    dispatch(failure(error))
                }
            },
            error => {
                dispatch(failure(error))
            }
        )
    }

    function loading() { return { type: gameConstants.RATING_UPDATE_REQUEST } }
    function success(result) { return { type: gameConstants.RATING_UPDATED, payload: result } }
    function failure(error) { return { type: gameConstants.RATING_UPDATE_FAIL, payload: error } }
}