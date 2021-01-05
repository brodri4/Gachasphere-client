import React, { useEffect } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { gameActions } from "../store/actions/gameActions";
import { Droppable, Draggable } from "react-beautiful-dnd";

function NotPlaying(props) {
  useEffect(() => {
    props.fetchRatings();
  }, [props.ratingCreated]);

  if (!props.gameRatings || !props.gameRatings[0]) {
    return (
      <div>
        <h1>Create a rating!</h1>
      </div>
    );
  } else {
    // sort by currently playing
    let ratings = props.gameRatings.map((rating, index) => {
      let altText = `${rating.Game.title} logo`;
      let gameLink = `/game/${rating.GameId}`;
      if (rating.playing === false) {
        return (
          <Draggable
            key={rating.id}
            draggableId={String(rating.id)}
            index={index}
          >
            {(provided) => (
              <li
                className="myListPlaying-item"
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
              >
                <NavLink to={gameLink}>
                  <div className="rating-item_game">
                    <img
                      src={rating.Game.logo}
                      alt={altText}
                      className="rating-item_game_logo"
                    />
                  </div>
                </NavLink>
              </li>
            )}
          </Draggable>
        );
      }
    });

    return (
      <Droppable droppableId="notPlaying">
        {(provided) => (
          <div
            className="playing-status-container"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <ul className="playing-status_ul">{ratings}</ul>
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    gameRatings: state.gameR.gameRatings,
    ratingCreated: state.gameR.ratingCreated,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchRatings: () => dispatch(gameActions.fetchRatings()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NotPlaying);
