import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import { gameActions } from '../store/actions/gameActions';

function AddRating(props) {
    const [rating, setRating] = useState({});
    const [invalid, setInvalid] = useState(false);
    const gameSelect = useRef(null);
    const playingRadio = useRef(null);

    useEffect(() => {
        props.fetchGames()
    }, [props.ratingCreated, props.ratingExists])

    const handleOnChange = (e) => {
        setRating({
            ...rating,
            [e.target.name]: e.target.value
        })
        setInvalid(false);
    }

    const handleOnSubmit = () => {
        let ratingObj = {
            gameId: rating.gameId,
            gameplayRating: rating.gameplayRating,
            f2pRating: rating.f2pRating,
            playing: rating.playing
        }

        if (!rating.gameId) {
            ratingObj.gameId = gameSelect.current.value;
        }

        if (!rating.playing) {
            ratingObj.playing = playingRadio.current.value;
        }

        if (ratingObj.gameplayRating && ratingObj.f2pRating) {
            props.createRating(ratingObj);
        } else {
            setInvalid(true)
        }

    }

    if(!props.games || !props.games[0]) {
        return (
            <h1>Loading!</h1>
        )
    } else {

        let selects = props.games.map( game => {
            return <option key={game.id} value={game.id}>{game.title}</option>
        })

        return (
            <div className="add-rating">
                <h1 className="heading">Add Rating</h1>
                {props.ratingCreated && !props.ratingExists && <h3>Rating created!</h3>}
                {props.ratingCreated === false && !props.ratingExists && <h3>Something went wrong.</h3>}
                {invalid && <h3>Please fill out all fields.</h3>}
                {props.ratingExists && <h3>Rating already exists.</h3>}
                <div className="add-rating_input-block">
                    <label htmlFor="game">Game</label>
                    <select name="gameId" id="game" ref={gameSelect} onChange={handleOnChange}>
                        {selects}
                    </select>
                    <label>Gameplay Rating</label>
                    <input className="add-rating_input" type="number" max="10" min="0" step="0.1" name="gameplayRating" onChange={handleOnChange} placeholder="10.0" onKeyPress={(e) => {if (e.key === 'Enter') {handleOnSubmit()}}}></input>
                    <label>Free to Play Rating</label>
                    <input className="add-rating_input" type="number" max="10" min="0" step="0.1" name="f2pRating" onChange={handleOnChange} placeholder="10.0" onKeyPress={(e) => {if (e.key === 'Enter') {handleOnSubmit()}}}></input>
                    <p>Currently playing?</p>
                    <div className="add-rating_input-block_radios">
                        <div className="flex-row">
                        <input type="radio" id="yes" name="playing" value="true" onChange={handleOnChange} ref={playingRadio} defaultChecked ></input>
                        <label htmlFor="yes">Yes</label>
                        </div>
                        <div className="flex-row">
                        <input type="radio" id="no" name="playing" value="false" onChange={handleOnChange}></input>
                        <label htmlFor="no">No</label>
                        </div>
                    </div>
                    <button id="add-rating_button" className="primary-button" onClick={handleOnSubmit}>Submit</button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        ratingCreated: state.gameR.ratingCreated,
        games: state.gameR.games,
        ratingExists: state.gameR.ratingExists
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchGames: () => dispatch(gameActions.fetchGames()),
        createRating: (rating) => dispatch(gameActions.createRating(rating))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddRating)