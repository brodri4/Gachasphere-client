import Axios from "axios";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { gameActions } from "../store/actions/gameActions";
import logo from "../images/favicon.ico";
import { setAuthenticationHeader } from "../utils/authenticate";

function AllSharedLists(props) {
  const [gamesList, setGamesList] = useState({ status: true });
  useEffect(() => {
    fetchAllList();
  }, []);

  const fetchAllList = async () => {
    let JWT = localStorage.getItem("jsonwebtoken");
    setAuthenticationHeader(JWT);
    let lists = await Axios.get("http://localhost:8080/lists/get-all-list");
    console.log(lists);
    setGamesList(lists.data.all_List);
    console.log(gamesList);
  };
  if (gamesList.status) {
    return (
      <div>
        <h1>Create a List!</h1>
      </div>
    );
  } else {
    let ratings = gamesList.map((rating) => {
      let altText = `${rating.Name} logo`;
      let gameLink = `/my-shared-list/${rating.id}`;
      return (
        <li key={rating.id} className="myListPlaying-item">
          <NavLink to={gameLink}>
            <div className="rating-item_game">
              <img src={logo} alt={altText} className="rating-item_game_logo" />
            </div>
            <p>{rating.Name}</p>
          </NavLink>
        </li>
      );
    });

    return (
      <div className="playing-status-container">
        <ul className="playing-status_ul">{ratings}</ul>
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(AllSharedLists);
