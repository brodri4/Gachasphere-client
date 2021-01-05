import React, { useState, useEffect } from "react";
import axios from "axios";
import GameSearchResult from "./GameSearchResult";

function GameSearchField() {
  const [gameSearch, setGameSearch] = useState([]);
  const [keyword, setKeyWord] = useState("");

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      setGameSearch([]);
      axios
        .post("https://gachasphere.herokuapp.com/games/search-game", {
          keyword: keyword,
        })
        .then((result) => {
          setGameSearch(result.data);
        });
    }, 500);
    return () => clearTimeout(timeOutId);
  }, [keyword]);
  return (
    <div className="search-box">
      <input
        className="input"
        placeholder="Please enter your game"
        onChange={(e) => setKeyWord(e.target.value)}
        name="keyword"
      ></input>
      <div className="search-result">
        {keyword ? <GameSearchResult games={gameSearch} /> : null}
      </div>
    </div>
  );
}

export default GameSearchField;
