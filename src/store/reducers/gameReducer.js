import { gameConstants } from '../actions/gameActionTypes';
import { userConstants } from '../actions/userActionTypes';

const initialState = { gameRatings: [] };

const gameReducer = (state = initialState, action) => {
    switch(action.type) {
        case gameConstants.GAMES_FETCHED:
            return {
                ...state,
                games: action.payload
            }
        case gameConstants.GAME_FETCH_FAIL:
            return {
                ...state,
                error: action.payload
            }
        case gameConstants.RATINGS_FETCHED:
            return {
                ...state,
                gameRatings: action.payload
            }
        case gameConstants.RATING_FETCH_FAIL:
            return {
                ...state,
                error: action.payload
            }
        // all reducers will need to listen for this
        case userConstants.LOGOUT:
            return {
                initialState
            }
        default:
            return state
    }
}

export default gameReducer;