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
import Axios from "axios";
import CreateList from "../components/CreateList";
import AllSharedLists from "../components/AllSharedLists";

// fake data generator

function MyLists(props) {
  const [activeComponent, setActiveComponent] = useState("nada");
  const [acticeCreateList, setActiveCreateList] = useState(false);
  const [updateList, setUpdateList] = useState(false);

  const handleOnClick = () => {
    if (activeComponent === "nada") {
      setActiveComponent("AddRating");
    } else if (activeComponent === "AddRating") {
      setActiveComponent("nada");
    }
  };
  const updatePlayingStatus = (result, status) => {
    Axios.post("https://gachasphere.herokuapp.com/games/update-playing", {
      userGameId: result.draggableId,
      playing: status,
    }).then((response) => {
      setUpdateList(!updateList);
    });
  };
  const handleOnDragEnd = (result) => {
    if (result.destination.droppableId !== result.source.droppableId) {
      if (result.destination.droppableId == "notPlaying") {
        updatePlayingStatus(result, false);
      } else if (result.destination.droppableId == "playing") {
        updatePlayingStatus(result, true);
      }
    }
  };
  const handleOnCreateList = () => {
    setActiveCreateList(!acticeCreateList);
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
        <button
          tabIndex="0"
          onClick={handleOnCreateList}
          className="secondary-button"
        >
          Create List
        </button>
        <AddFilter active={activeComponent}>
          <AddRating name="AddRating" />
          <div name="nada"></div>
        </AddFilter>
        <CreateList isActive={acticeCreateList} />
      </div>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <div className="myLists_playing">
          <NavLink to="/detailed/playing">
            <button className="heading-button">Currently Playing</button>
          </NavLink>
          <CurrentlyPlaying updateListAction={updateList} />
        </div>
        <div className="myLists_not-playing">
          <NavLink to="/detailed/not-playing">
            <button className="heading-button">No Longer Playing</button>
          </NavLink>
          <NotPlaying updateListAction={updateList} />
        </div>
      </DragDropContext>
      <div className="All_List">
        <button className="heading-button">My Lists</button>
        <AllSharedLists />
      </div>
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
