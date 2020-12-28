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
        case gameConstants.SINGLE_RATING_LOADING:
            return {
                ...state,
                singleLoading: true
            }
        case gameConstants.SINGLE_RATING_FETCHED:
            return {
                ...state,
                singleLoading: false,
                singleRating: action.payload
            }
        case gameConstants.SINGLE_RATING_FETCH_FAIL:
            return {
                ...state,
                singleLoading: false,
                error: action.payload
            }
        case gameConstants.RATING_UPDATE_REQUEST:
            return {
                ...state,
                updateLoading: true
            }
        case gameConstants.RATING_UPDATED:
            return {
                ...state,
                updateLoading: false,
                ratingUpdated: true
            }
        case gameConstants.RATING_UPDATE_FAIL:
            return {
                ...state,
                updateLoading: false,
                ratingUpdated: false,
                error: action.payload
            }
        case gameConstants.RATING_DELETE_REQUEST:
            return {
                ...state,
                deleteLoading: true
            }
        case gameConstants.RATING_DELETED:
            return {
                ...state,
                deleteLoading: false,
                ratingDeleted: true
            }
        case gameConstants.RATING_DELETE_FAIL:
            return {
                ...state,
                deleteLoading: false,
                ratingDeleted: false
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