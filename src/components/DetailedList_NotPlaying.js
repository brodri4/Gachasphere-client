import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { generatePath, NavLink } from 'react-router-dom';
import { gameActions } from '../store/actions/gameActions';
import AddRating from '../components/AddRating';
import AddFilter from '../components/AddFilter';

function DetailedList_NotPlaying(props) {
    const [activeComponent, setActiveComponent] = useState("nada")
    
    const handleOnClick = () => {
        if (activeComponent === "nada") {
            setActiveComponent("AddRating")
        } else if (activeComponent === "AddRating") {
            setActiveComponent("nada")
        }
    }

    useEffect(() => {
        props.fetchRatings()
    }, [props.deleteLoading])

    if(!props.gameRatings || !props.gameRatings[0]) {
        return (
            <div className="empty-detailed-list">
                <h1 className="heading">Create a rating!</h1>
                <div className="add-rating_container">
                    <button tabIndex="0" onClick={handleOnClick} className="secondary-button">Add Rating</button>
                    <AddFilter active={activeComponent}>
                        <AddRating name="AddRating"/>
                        <div name="nada"></div>
                    </AddFilter>
                </div>
            </div>
        )
    } else {
        // sort by currently playing
        let ratings = props.gameRatings.map(rating => {
            let altText = `${rating.Game.title} logo`;
            let gameLink = `/game/${rating.GameId}`;
            if (rating.playing === false) {
                return ( 
                    <li key={rating.id} className="rating-item">
                        <NavLink to={gameLink}>
                        <div className="rating-item_game">
                            <img src={rating.Game.logo} alt={altText} className="rating-item_game_logo"/>
                            <h2 className="secondary-heading">{rating.Game.title}</h2>
                        </div>
                        </NavLink>
                        <div className="rating-item_rating">
                            <div className="rating-item_rating_tertiary-text">
                                <p>Gameplay:</p>
                                <p>Free to Play:</p>
                            </div>
                            <div className="rating-item_rating_secondary-text">
                                <p>{rating.gameplayRating}/10</p>
                                <p>{rating.f2pRating}/10</p>
                            </div>
                            <div className="detailed-list_buttons">
                                <NavLink to={generatePath("/edit-rating/:id", {id: rating.id})}><button className="secondary-button">Edit</button></NavLink>
                                <button className="primary-button" onClick={() => {props.deleteRating(rating.id)}}>Delete</button>
                            </div>
                        </div>
                    </li> 
                )
            }
        })

        return (
            <div className="detailed-list-page">
                <h1 className="heading">My Games - No Longer Playing</h1>
                <ul className="container_rating-items">
                    {ratings}
                </ul>
                <div className="add-rating_container">
                    <button tabIndex="0" onClick={handleOnClick} className="secondary-button">Add Rating</button>
                    <AddFilter active={activeComponent}>
                        <AddRating name="AddRating"/>
                        <div name="nada"></div>
                    </AddFilter>
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailedList_NotPlaying);