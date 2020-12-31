import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { gameActions } from '../store/actions/gameActions';

function FreeToPlayMyLists(props) {

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
        let sortedRating = props.gameRatings.sort((a, b) => b.f2pRating - a.f2pRating);
        let ratings = sortedRating.map(rating => {
            let altText = `${rating.Game.title} logo`
            return (
                <li key={rating.id} className="myListPlaying-item">
                    <div className="rating-item_game">
                        <img src={rating.Game.logo} alt={altText} className="rating-item_game_logo" />
                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(FreeToPlayMyLists);