import React, { useState } from "react";
import { NavLink } from "react-router-dom";

function GameSearchResult(props) {
  if (!props.games || !props.games[0]) {
    return (
      <div>
        <h6>Loading!</h6>
      </div>
    );
  } else if (props.game) {
    return (
      <div>
        <h6>No result</h6>
      </div>
    );
  } else {
    let searchResult = props.games.map((game) => {
      let gameLink = `/game/${game.id}`;
      return (
        <li key={game.id} className="option">
          <NavLink to={gameLink}>
            <img src={game.logo} />
            <p>{game.title}</p>
          </NavLink>
        </li>
      );
    });
    return <ul>{searchResult}</ul>;
  }
}

export default GameSearchResult;
