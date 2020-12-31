import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { gameActions } from '../store/actions/gameActions';

function EditRating(props) {
    const [localRating, setLocalRating] = useState({});
    const [edited, setEdited] = useState(false)
    
    let id = props.match.params.id;

    const fetchRating = (id) => {
        props.fetchSingleRating(id)
    }

    useEffect(() => {
        fetchRating(id)
    }, [props.updateLoading])

    const handleOnChange = (e) => {
        setLocalRating({
            ...localRating,
            [e.target.name]: e.target.value
        })
        setEdited(false)
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
        setEdited(true)
    }

    if (!props.singleRating || props.singleLoading) {
        return (
            <h1>Loading!</h1>
        )
    } else if (!props.singleLoading) {

        let radios = '';
        if (props.singleRating.playing) {
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
            <div className="edit-page">
                <h1 className="heading">Edit Rating</h1>
                <div className="container_edit-rating">
                    <div className="edit-heading">
                        <img src={props.singleRating.Game.logo} alt={altText} className="rating-item_game_logo"/>
                        <h2 className="edit-heading_game-title">{props.singleRating.Game.title}</h2>
                    </div>
                    {edited && props.ratingUpdated && !props.ratingLoading && <h3 className="message-text">Rating updated!</h3>}
                    {edited && !props.ratingUpdated && !props.ratingLoading && <h3 className="message-text">Something went wrong.</h3>}
                    <div className="input-block">
                        <label htmlFor="editGameplay">Gameplay Rating</label>
                        <input id="editGameplay" type="number" max="10" min="0" step="0.1" name="gameplayRating" onChange={handleOnChange} placeholder="10.0" defaultValue={props.singleRating.gameplayRating} onKeyPress={(e) => {if (e.key === 'Enter') {handleOnClick()}}}></input>
                        <label htmlFor="editF2P">Free to Play Rating</label>
                        <input id="editF2P" type="number" max="10" min="0" step="0.1" name="f2pRating" onChange={handleOnChange} placeholder="10.0" defaultValue={props.singleRating.f2pRating} onKeyPress={(e) => {if (e.key === 'Enter') {handleOnClick()}}}></input>
                        <p>Currently playing?</p>
                            {radios.inputs}
                        <button className="primary-button" onClick={handleOnClick}>Submit</button>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        singleRating: state.gameR.singleRating,
        singleLoading: state.gameR.singleLoading,
        updateLoading: state.gameR.updateLoading,
        ratingUpdated: state.gameR.ratingUpdated
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchSingleRating: (id) => dispatch(gameActions.fetchSingleRating(id)),
        updateRating: (ratingObj) => dispatch(gameActions.updateRating(ratingObj))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditRating);