import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { gameActions } from '../store/actions/gameActions';

function GameplayMyLists(props) {

    useEffect(() => {
        props.fetchRatings()
    }, [props.ratingCreated])

    if (!props.gameRatings || !props.gameRatings[0]) {
        return (
            <div>
                <h1>Create a rating!</h1>
            </div>
        )
    } else {
        let sortedRating = props.gameRatings.sort((a, b) => b.gameplayRating - a.gameplayRating);
        let ratings = sortedRating.map(rating => {
            let altText = `${rating.Game.title} logo`
            let gameLink = `/game/${rating.GameId}`
            return (
                <li key={rating.id} className="myListPlaying-item">
                    <NavLink to={gameLink}>
                    <div className="rating-item_game">
                        <img src={rating.Game.logo} alt={altText} className="rating-item_game_logo" />
                    </div>
                    </NavLink>
                </li>
            )
        })

        return (
            <div className='playing-status-container'>
                <ul className='playing-status_ul'>
                    {ratings}
                </ul>
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        gameRatings: state.gameR.gameRatings,
        ratingCreated: state.gameR.ratingCreated
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchRatings: () => dispatch(gameActions.fetchRatings())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameplayMyLists);