import React, { useState } from "react";
import { NavLink } from "react-router-dom";

function GameSearchResult(props) {
  if (!props.games || !props.games[0]) {
    return (
      <div>
        <p className="search-message">Loading!</p>
      </div>
    );
  } else if (props.game) {
    return (
      <div>
        <p className="search-message">No result</p>
      </div>
    );
  } else {
    let searchResult = props.games.map((game) => {
      let altText = `${game.title} logo`;
      let gameLink = `/game/${game.id}`;
      return (
        <li key={game.id} className="option">
          <NavLink to={gameLink} className="search-link">
            <img src={game.logo} alt={altText}/>
            <p>{game.title}</p>
          </NavLink>
        </li>
      );
    });
    return <ul>{searchResult}</ul>;
  }
}

export default GameSearchResult;
