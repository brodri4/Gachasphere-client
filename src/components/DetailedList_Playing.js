import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { gameActions } from '../store/actions/gameActions';
import { generatePath, NavLink } from 'react-router-dom';

function DetailedList_Playing(props) {

    useEffect(() => {
        props.fetchRatings()
    }, [props.deleteLoading])

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
                    {rating.playing === true ?
                    <li key={rating.id} className="rating-item">
                        <div className="rating-item_game">
                            <img src={rating.Game.logo} alt={altText} className="rating-item_game_logo"/>
                            <h3>{rating.Game.title}</h3>
                        </div>
                        <div className="rating-item_rating">
                            <p>Gameplay: {rating.gameplayRating}</p>
                            <p>Free To Play: {rating.f2pRating}</p>
                            <div className="detailed-list_buttons">
                                <NavLink to={generatePath("/edit-rating/:id", {id: rating.id})}><button className="secondary-button">Edit</button></NavLink>
                                <button className="primary-button" onClick={() => {props.deleteRating(rating.id)}}>Delete</button>
                            </div>
                        </div>
                    </li> 
                    : null }
                </div>
            )
        })

        return (
            <div className="detailed-list-page">
                <h1 className="heading">My Games - Playing</h1>
                <ul className="container_rating-items">
                    {ratings}
                </ul>
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        gameRatings: state.gameR.gameRatings,
        deleteLoading: state.gameR.deleteLoading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchRatings: () => dispatch(gameActions.fetchRatings()),
        deleteRating: (id) => dispatch(gameActions.deleteRating(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailedList_Playing);