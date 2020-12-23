import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { generatePath, NavLink } from 'react-router-dom';
import { gameActions } from '../store/actions/gameActions';

function DetailedList_NotPlaying(props) {

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
            let altText = `${rating.Game.title} logo`;
            return ( 
                <div>
                    {rating.playing === false ?
                    <li key={rating.id} className="rating-item">
                        <div className="rating-item_game">
                            <img src={rating.Game.logo} alt={altText} className="rating-item_game_logo"/>
                            <h3>{rating.Game.title}</h3>
                        </div>
                        <div className="rating-item_rating">
                            <p>Gameplay: {rating.gameplayRating}</p>
                            <p>Free To Play: {rating.f2pRating}</p>
                            <NavLink to={generatePath("/edit-rating/:id", {id: rating.id})}><button className="secondary_button">Edit</button></NavLink>
                        </div>
                    </li> 
                    : null }
                </div>
            )
        })

        return (
            <div>
                <h1 className="heading">My Games - Not Playing</h1>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailedList_NotPlaying);