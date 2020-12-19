import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { gameActions } from '../store/actions/gameActions';

function Dashboard(props) {

    useEffect(() => {
        props.fetchRatings()
    })

    if(!props.gameRatings || !props.gameRatings[0]) {
        return (
            <div>
                <h1>Create a rating!</h1>
            </div>
        )
    } else {
        let ratings = props.gameRatings.map(rating => {
            let altText = `${rating.Game.title} logo`
            return ( 
                <li key={rating.id} className="rating-item">
                    <div className="rating-item_game">
                        <img src={rating.Game.logo} alt={altText}/>
                        <h3>{rating.Game.title}</h3>
                        <p>{rating.Game.releaseDate}</p>
                        <p>{rating.Game.developer}</p>
                    </div>
                    <div className="rating-item_rating">
                        <p>Gameplay: {rating.gameplayRating}</p>
                        <p>f2p: {rating.f2pRating}</p>
                        <p>currently playing: {rating.playing ? "yes" : "no"}</p>
                    </div>
                </li>
            )
        })

        return (
            <ul>
                {ratings}
            </ul>
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

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);