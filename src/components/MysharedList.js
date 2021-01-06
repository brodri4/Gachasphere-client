import React, { useEffect, useState } from "react";

import { generatePath, NavLink } from "react-router-dom";
import AddFilter from "../components/AddFilter";
import AddRating from "../components/AddRating";
import axios from "axios";
import { useParams } from "react-router-dom";
import AddGameToList from "./AddGameToList";
import CreateSharedLink from "./CreateSharedLink";

function Mysharedlist(props) {
  const [activeComponent, setActiveComponent] = useState("nada");
  const [gamesList, setGamesList] = useState({ status: true });
  const [sharedLink, setSharedLink] = useState(false);
  const listId = parseInt(useParams().listId);

  const handleOnClick = () => {
    if (activeComponent === "nada") {
      setActiveComponent("AddRating");
    } else if (activeComponent === "AddRating") {
      setActiveComponent("nada");
    }
  };
  const handleOnDelete = (gameId) => {
    axios
      .post("http://localhost:8080/lists/delete-listGame", {
        GameId: gameId,
      })
      .then((result) => {
        if (result.data.gameDeleted) {
          fetchGameList();
        }
      });
  };
  const handleOnSharedLinkClick = () => {
    setSharedLink(!sharedLink);
  };
  const fetchGameList = async () => {
    let list = await axios.get(
      `http://localhost:8080/lists/gameList/${listId}`
    );
    await setGamesList(list.data);
  };

  useEffect(() => {
    fetchGameList();
  }, []);

  if (gamesList.status) {
    console.log(gamesList);
    return (
      <div className="empty-detailed-list">
        <h1 className="heading">Create a rating!</h1>
        <div className="add-rating_container">
          <button
            tabIndex="0"
            onClick={handleOnClick}
            className="secondary-button"
          >
            Add Rating
          </button>
          <AddFilter active={activeComponent}>
            <AddGameToList
              name="AddRating"
              listId={listId}
              refetchGame={fetchGameList()}
            />
            <div name="nada"></div>
          </AddFilter>
          <CreateSharedLink />
        </div>
      </div>
    );
  } else if ("Name" in gamesList) {
    // sort by currently playing
    let ratings = gamesList.gamesList.map((rating) => {
      let altText = `${rating.game.title} logo`;
      let gameLink = `/game/${rating.game.id}`;
      if (true) {
        return (
          <li key={rating.GameId} className="rating-item">
            <NavLink to={gameLink}>
              <div className="rating-item_game">
                <img
                  src={rating.game.logo}
                  alt={altText}
                  className="rating-item_game_logo"
                />
                <h2 className="secondary-heading">{rating.game.title}</h2>
              </div>
            </NavLink>
            <div className="rating-item_rating">
              <div className="rating-item_rating_text">
                <div className="rating-item_rating_tertiary-text">
                  <p>Gameplay:</p>
                  <p>Free To Play:</p>
                </div>
                <div className="rating-item_rating_secondary-text">
                  <p>{rating.game.averageRating.toFixed(1)}/10</p>
                  <p>{rating.game.averageF2P.toFixed(1)}/10</p>
                </div>
              </div>
              <div className="detailed-list_buttons">
                <button
                  className="primary-button"
                  onClick={() => {
                    handleOnDelete(rating.id);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </li>
        );
      }
    });

    return (
      <div className="detailed-list-page">
        <h1 className="heading">My List</h1>
        <ul className="container_rating-items">{ratings}</ul>
        <div className="add-rating_container">
          <button
            tabIndex="0"
            onClick={handleOnClick}
            className="secondary-button"
          >
            Add Game
          </button>
          <button
            tabIndex="0"
            onClick={handleOnSharedLinkClick}
            className="secondary-button"
          >
            Share Link
          </button>
          <AddFilter active={activeComponent}>
            <AddGameToList
              name="AddRating"
              listId={listId}
              fetchGameList={fetchGameList}
            />
            <div name="nada"></div>
          </AddFilter>
          <CreateSharedLink sharedLink={sharedLink} listId={listId} />
        </div>
      </div>
    );
  }
}

export default Mysharedlist;
