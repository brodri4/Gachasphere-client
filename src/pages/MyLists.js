import React, { useState } from "react";

// Components
import NotPlaying from "../components/NotPlaying";
import CurrentlyPlaying from "../components/CurrentlyPlaying";
import AddRating from "../components/AddRating";
import AddFilter from "../components/AddFilter";
import { NavLink } from "react-router-dom";
import FreeToPlayMyLists from "../components/FreeToPlay_MyLists";
import GameplayMyLists from "../components/Gameplay_MyLists";
import { DragDropContext } from "react-beautiful-dnd";

// fake data generator

function MyLists(props) {
  const [activeComponent, setActiveComponent] = useState("nada");

  const handleOnClick = () => {
    if (activeComponent === "nada") {
      setActiveComponent("AddRating");
    } else if (activeComponent === "AddRating") {
      setActiveComponent("nada");
    }
  };

  return (
    <div className="myLists-container">
      <div className="add-rating_container">
        <button
          tabIndex="0"
          onClick={handleOnClick}
          className="secondary-button"
        >
          Add Rating
        </button>
        <AddFilter active={activeComponent}>
          <AddRating name="AddRating" />
          <div name="nada"></div>
        </AddFilter>
      </div>
      <DragDropContext>
        <div className="myLists_playing">
          <NavLink to="/detailed/playing">
            <button className="heading-button">Currently Playing</button>
          </NavLink>
          <CurrentlyPlaying />
        </div>
        <div className="myLists_not-playing">
          <NavLink to="/detailed/not-playing">
            <button className="heading-button">No Longer Playing</button>
          </NavLink>
          <NotPlaying />
        </div>
      </DragDropContext>
      <div className="myLists_f2p">
        <NavLink to="/detailed/free-to-play">
          <button className="heading-button">Sorted by Free To Play</button>
        </NavLink>
        <FreeToPlayMyLists />
      </div>
      <div className="myLists_gameplay">
        <NavLink to="/detailed/gameplay">
          <button className="heading-button">Sorted by Gameplay</button>
        </NavLink>
        <GameplayMyLists />
      </div>
    </div>
  );
}

export default MyLists;
