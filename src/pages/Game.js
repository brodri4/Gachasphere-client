import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Article from './components/Article';
import { useParams, Link } from "react-router-dom"
import { TwitterTimelineEmbed } from 'react-twitter-embed'
import '../index.css'
import iOS from '../images/appstore.png'
import Android from '../images/playstore.png'

// Components
import GameSearchField from "../components/GameSearchField";
import AddRating from "../components/AddRating";
import AddFilter from "../components/AddFilter";

function Game(props) {
  const [activeComponent, setActiveComponent] = useState("nada");
  const gameId = parseInt(useParams().gameId)
  const [articles, setArticles] = useState([]);
  const [game, setGame] = useState({
    averageRating: null,
    averageF2P: null
  });

  const handleOnClick = () => {
    if (activeComponent === "nada") {
      setActiveComponent("AddRating");
    } else if (activeComponent === "AddRating") {
      setActiveComponent("nada");
    }
  };

  useEffect(() => {
    findGame(gameId)
    fetchReddit()
  }, [game]);

  const findGame = (gameId) => {
    const currentGame = props.games.find(game =>
      game.id === gameId
    )
    setGame(currentGame)
    return;
  }

  const fetchReddit = () => {
    if (game.reddit) {
      fetch("https://www.reddit.com/r/" + game.reddit + "/hot" + ".json").then(
        res => {
          if (res.status !== 200) {
            console.warn("Warning: Something is wrong with the api.");
            return;
          }
          res.json().then(data => {
            if (data != null)
              setArticles(data.data.children);
          });
        }
      )
    } else {
      return null
    }
  }

  if (!props.games || !props.games[0]) {
    return (
      <div>
        <h1>Loading!</h1>
      </div>
    )
  } else {
    let altText = `${props.games.title} logo`
    return (
      <div className='game-details-container'>
        <h1 className='heading'>Game Details</h1>
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
        <div className="gameComponent">
          <div className='articles'>
            <h2 className="articles_secondary-heading">{game.title}</h2>
            <div className='articles_game-details-list'>
              <img src={game.logo} alt={altText} className="game-item_game_logo" />
              <p className="developer">Developer: {game.developer}</p>
              <p className="released">Released: {game.releaseDate}</p>
              {game.averageRating === null ? null : <p className="average-rating">Average Gameplay Rating:</p>}
              {game.averageRating === null ? null : <p className="average">{game.averageRating.toFixed(1)}/10</p>}
              {game.averageF2P === null ? null : <p className="average-rating">Average F2P Rating:</p>}
              {game.averageF2P === null ? null : <p className="average">{game.averageF2P.toFixed(1)}/10</p>}
              {game.iOS == null ? null : <a href={game.iOS} target="_blank" ><img src={iOS} className="dl-button2"></img></a>}
              {game.Android == null ? null : <a href={game.Android} target="_blank" ><img src={Android} className="dl-button"></img></a>}
            </div>

          </div>
          <div className="articles">
            <h2 className='articles_secondary-heading'>Reddit</h2>
            <div className='articles_list'>
              {(articles != null) ? articles.map((article, index) => <Article key={index} article={article.data} />) : ''}
            </div>
          </div>
          <div className="articles">
            <h2 className='articles_secondary-heading'>Twitter</h2>
            <div className='articles_list'>
              <TwitterTimelineEmbed
                sourceType="profile"
                screenName={game.twitter}
                options={{ height: 800 }, { width: 350 }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    games: state.gameR.games
  }
}

export default connect(mapStateToProps)(Game);