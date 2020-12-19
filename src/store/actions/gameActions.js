import { gameConstants } from './gameActionTypes';
import { gameService } from './gameService';

export const gameActions = {
    fetchRatings
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