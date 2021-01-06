import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import { gameActions } from "../store/actions/gameActions";
import axios from "axios";

function AddGameToList(props) {
  const [rating, setRating] = useState({});
  const [invalid, setInvalid] = useState(false);
  const gameSelect = useRef(null);

  useEffect(() => {
    props.fetchGames();
  }, [props.ratingCreated, props.ratingExists]);

  const addGameToList = (gameAddObj) => {
    console.log(gameAddObj);
    axios
      .post("http://localhost:8080/lists/add-game-to-list", gameAddObj)
      .then((result) => {
        if (result.data.gameAdded) {
          props.fetchGameList();
        }
      });
  };
  const handleOnChange = (e) => {
    setRating({
      ...rating,
      [e.target.name]: e.target.value,
    });
    setInvalid(false);
  };

  const handleOnSubmit = () => {
    let gameAddObj = {
      GameId: rating.gameId,
      listId: props.listId,
    };

    if (!rating.gameId) {
      gameAddObj.gameId = gameSelect.current.value;
    }
    addGameToList(gameAddObj);
  };

  if (!props.games || !props.games[0]) {
    return <h1>Loading!</h1>;
  } else {
    let selects = props.games.map((game) => {
      return (
        <option key={game.id} value={game.id}>
          {game.title}
        </option>
      );
    });

    return (
      <div className="add-rating">
        <h1 className="heading">Add Game</h1>
        {props.ratingCreated && !props.ratingExists && (
          <h2 className="message-text">Rating created!</h2>
        )}
        {props.ratingCreated === false && !props.ratingExists && (
          <h2 className="message-text">Something went wrong.</h2>
        )}
        {props.ratingExists && (
          <h2 className="message-text">Rating already exists.</h2>
        )}
        <div className="add-rating_input-block">
          <label htmlFor="game">Game</label>
          <select
            name="gameId"
            id="game"
            ref={gameSelect}
            onChange={handleOnChange}
          >
            {selects}
          </select>
          <button
            id="add-rating_button"
            className="primary-button"
            onClick={handleOnSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ratingCreated: state.gameR.ratingCreated,
    games: state.gameR.games,
    ratingExists: state.gameR.ratingExists,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchGames: () => dispatch(gameActions.fetchGames()),
    createRating: (rating) => dispatch(gameActions.createRating(rating)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddGameToList);
