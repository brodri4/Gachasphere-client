import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import { gameActions } from '../store/actions/gameActions';

function AddRating(props) {
    const [rating, setRating] = useState({});
    const [invalid, setInvalid] = useState(false);
    const [created, setCreated] = useState(false);
    const gameSelect = useRef(null);
    const playingCheck = useRef(null);

    useEffect(() => {
        props.fetchGames()
    }, [])

    const handleOnChange = (e) => {
        setRating({
            ...rating,
            [e.target.name]: e.target.value
        })
        setCreated(false);
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
            ratingObj.playing = playingCheck.current.value;
        }

        if (ratingObj.gameplayRating && ratingObj.f2pRating) {
            props.createRating(ratingObj);
            setCreated(true);
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
                {created && <h1>Rating created!</h1>}
                {invalid && <h1>Please fill out all fields.</h1>}
                <div className="input-block">
                    <label htmlFor="game">Game</label>
                    <select name="gameId" id="game" ref={gameSelect} onChange={handleOnChange}>
                        {selects}
                    </select>
                    <label>Gameplay Rating</label>
                    <input type="number" max="10" min="0" step="0.1" name="gameplayRating" onChange={handleOnChange} placeholder="10.0"></input>
                    <label>Free to Play Rating</label>
                    <input type="number" max="10" min="0" step="0.1" name="f2pRating" onChange={handleOnChange} placeholder="10.0"></input>
                    <label>Playing</label>
                    <input type="checkbox" name="playing" value="true" ref={playingCheck} onChange={handleOnChange} defaultChecked></input>
                    <button className="primary-button" onClick={handleOnSubmit}>Submit</button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        ratingCreated: state.gameR.ratingCreated,
        games: state.gameR.games
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchGames: () => dispatch(gameActions.fetchGames()),
        createRating: (rating) => dispatch(gameActions.createRating(rating))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddRating)