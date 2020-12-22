import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { gameActions } from '../store/actions/gameActions';

function NotPlaying(props) {

    useEffect(() => {
        props.fetchRatings()
    }, [])

    if (!props.gameRatings || !props.gameRatings[0]) {
        return (
            <div>
                <h1>Create a rating!</h1>
            </div>
        )
    } else {
        // sort by currently playing
        let ratings = props.gameRatings.map(rating => {
            let altText = `${rating.Game.title} logo`
            return (
                <div>
                    {rating.playing === true ? null :
                    <li key={rating.id} className="rating-item">
                        <div className="rating-item_game">
                            <img src={rating.Game.logo} alt={altText} className="rating-item_game_logo" />
                        </div>

                        <div className="rating-item_rating">
                            <h3>{rating.Game.title}</h3>
                            <p>Gameplay: {rating.gameplayRating}</p>
                            <p>Free To Play: {rating.f2pRating}</p>
                            <p>Status: {rating.playing === true ? 'is playing' : 'is not playing'}</p>
                        </div>
                    </li>
                    }
                </div>
            )
        })

        return (
            <div>
                {/* <h1 className="my-games-heading">No Longer Playing</h1> */}
                <ul>
                    {ratings}
                </ul>
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        gameRatings: state.gameR.gameRatings
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchRatings: () => dispatch(gameActions.fetchRatings())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NotPlaying);