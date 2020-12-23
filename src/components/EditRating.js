import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { gameActions } from '../store/actions/gameActions';

function EditRating(props) {
    const [localRating, setLocalRating] = useState({});
    
    let id = props.match.params.id;

    const fetchRating = (id) => {
        props.fetchSingleRating(id)
    }

    useEffect(() => {
        fetchRating(id)
    }, [])

    const handleOnChange = (e) => {
        setLocalRating({
            ...localRating,
            [e.target.name]: e.target.value
        })
    }

    const handleOnClick = () => {
        
        let ratingObj = {
            ratingId: id,
            gameId: props.singleRating.GameId,
            gameplayRating: props.singleRating.gameplayRating,
            f2pRating: props.singleRating.f2pRating,
            playing: props.singleRating.playing
        }

        if (localRating.gameplayRating) {
            ratingObj.gameplayRating = localRating.gameplayRating
        }

        if (localRating.f2pRating) {
            ratingObj.f2pRating = localRating.f2pRating
        }

        if (localRating.playing) {
            ratingObj.playing = localRating.playing
        }

        props.updateRating(ratingObj)
    }

    if (!props.singleRating || props.singleLoading) {
        return (
            <h1>Loading!</h1>
        )
    } else if (!props.singleLoading) {

        let radios = '';
        if (props.singleLoading.playing) {
            radios = {inputs: <div>
                                <label htmlFor="yes">Yes</label>
                                <input type="radio" id="yes" name="playing" value="true" onChange={handleOnChange} defaultChecked></input>
                                <label htmlFor="no">No</label>
                                <input type="radio" id="no" name="playing" value="false" onChange={handleOnChange}></input>
                            </div>}
        } else {
            radios = {inputs: <div>
                                <label htmlFor="yes">Yes</label>
                                <input type="radio" id="yes" name="playing" value="true" onChange={handleOnChange}></input>
                                <label htmlFor="no">No</label>
                                <input type="radio" id="no" name="playing" value="false" onChange={handleOnChange} defaultChecked></input>
                            </div>}
        }
        let altText = `${props.singleRating.Game.title} logo`;

        return (
            <div>
                <img src={props.singleRating.Game.logo} alt={altText} className="rating-item_game_logo"/>
                <h1>{props.singleRating.Game.title}</h1>
                <div className="input-block">
                    <label>Gameplay Rating</label>
                    <input type="number" max="10" min="0" step="0.1" name="gameplayRating" onChange={handleOnChange} placeholder="10.0" defaultValue={props.singleRating.gameplayRating}></input>
                    <label>Free to Play Rating</label>
                    <input type="number" max="10" min="0" step="0.1" name="f2pRating" onChange={handleOnChange} placeholder="10.0" defaultValue={props.singleRating.f2pRating}></input>
                    <p>Currently playing?</p>
                        {radios.inputs}
                    <button className="primary-button" onClick={handleOnClick}>Submit</button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        singleRating: state.gameR.singleRating,
        singleLoading: state.gameR.singleLoading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchSingleRating: (id) => dispatch(gameActions.fetchSingleRating(id)),
        updateRating: (ratingObj) => dispatch(gameActions.updateRating(ratingObj))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditRating);