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
        case gameConstants.RATING_CREATE_REQUESTED:
            return {
                ...state,
                ratingExists: false,
                ratingCreated: false
            }
        case gameConstants.RATING_CREATED:
            return {
                ...state,
                ratingExists: false,
                ratingCreated: true
            }
        case gameConstants.RATING_CREATE_FAIL:
            return {
                ...state,
                ratingCreated: false,
                error: action.payload
            }
        case gameConstants.RATING_CREATE_FAIL_EXISTS:
            return {
                ...state,
                ratingCreated: false,
                ratingExists: true
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