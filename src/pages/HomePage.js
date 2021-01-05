import React, { useState } from "react";

// Components
import FreeToPlay from "../components/FreeToPlay";
import AvgRating from "../components/AvgRating";
import Popularity from "../components/Popularity";
import GameSearchField from "../components/GameSearchField";
import AddRating from "../components/AddRating";
import AddFilter from "../components/AddFilter";

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
    <div className='homepage-container'>
      <div className="homepage-heading">
        <h1 className="heading">World of Anime Mobile Gaming</h1>
      </div>
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
        <GameSearchField />
      </div>
      <ul className="homepage-category-container">
        <li className="homepage-category_li">
          <h2 className="homepage_secondary-heading">Popular Games</h2>
          <Popularity />
        </li>
        <li className="homepage-category_li">
          <h2 className="homepage_secondary-heading">Top Free To Play</h2>
          <FreeToPlay />
        </li>
        <li className="homepage-category_li">
          <h2 className="homepage_secondary-heading">Highest Rated</h2>
          <AvgRating />
        </li>
      </ul>
    </div>
  );
}

export default MyLists;
