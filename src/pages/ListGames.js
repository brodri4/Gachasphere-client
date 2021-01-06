import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";

function ListGames(props) {
  const [gamesList, setGamesList] = useState({ status: true });
  const listId = parseInt(useParams().listId);
  const fetchGameList = async () => {
    let list = await axios.get(
      `http://localhost:8080/lists/gameList/${listId}`
    );

    console.log(list.data);
    await setGamesList(list.data);
    console.log(list.data);
  };
  useEffect(() => {
    fetchGameList();
  }, []);

  // add spinner here?
  if (gamesList.status) {
    console.log(gamesList);
    return (
      <div>
        <h1>Loading!</h1>
      </div>
    );
  } else if (gamesList.message) {
    console.log(gamesList);
    return (
      <div>
        <h1>This List is not available!</h1>
      </div>
    );
  } else {
    let listOfGames = gamesList.gamesList.map((game) => {
      let altText = `${game.game.title} logo`;
      let gameLink = `/game/${game.game.id}`;
      return (
        <li key={game.game.id} className="game-item">
          <NavLink to={gameLink}>
            <div className="game-item_left">
              <img
                src={game.game.logo}
                alt={altText}
                className="game-item_game_logo"
              />
              <h2 className="secondary-heading">{game.game.title}</h2>
            </div>
          </NavLink>
          <div className="game-item_right">
            <p className="developer">Developer:</p>
            <p className="released">Released:</p>
            {game.game.averageRating === null ? null : (
              <p className="average-rating">Average Rating:</p>
            )}
            <p className="developer-name">{game.game.developer}</p>
            <p className="release-date">{game.game.releaseDate}</p>
            {game.game.averageRating === null ? null : (
              <p className="average">{game.game.averageRating.toFixed(1)}/10</p>
            )}
          </div>
        </li>
      );
    });

    return (
      <div className="games-page">
        <h1 className="heading">{gamesList.Name}</h1>
        <ul className="container_game-items">{listOfGames}</ul>
      </div>
    );
  }
}

export default ListGames;
