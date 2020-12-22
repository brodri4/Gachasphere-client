import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { gameActions } from '../store/actions/gameActions';

function HomePage(props) {

    useEffect(() => {
        props.fetchRatings()
    }, [])

    if(!props.gameRatings || !props.gameRatings[0]) {
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
                <li key={rating.id} className="rating-item">
                    <div className="rating-item_game">
                        <img src={rating.Game.logo} alt={altText} className="rating-item_game_logo"/>
                        <h3>{rating.Game.title}</h3>
                    </div>
                    <div className="rating-item_rating">
                        <p>Gameplay: {rating.gameplayRating}</p>
                        <p>Free To Play: {rating.f2pRating}</p>
                    </div>
                </li>
            )
        })

        return (
            <div>
                <h1 className="my-games-heading">My Games</h1>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);