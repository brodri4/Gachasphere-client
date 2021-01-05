import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Article from './components/Article';
import { useParams, Link } from "react-router-dom"
import { TwitterTimelineEmbed } from 'react-twitter-embed'
import '../index.css'
import iOS from '../images/appstore.png'
import Android from '../images/playstore.png'

function Game(props) {
  const gameId = parseInt(useParams().gameId)
  const [articles, setArticles] = useState([]);
  const [game, setGame] = useState({
    averageRating: null, 
    averageF2P: null
  });

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
    if(game.reddit){
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
    }else{
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
        <div className="gameComponent">
          <div className='articles'>
            <img src={game.logo} alt={altText} className="game-item_game_logo" />
            <h2 className="secondary-heading">{game.title}</h2>
            <p className="developer">Developer: {game.developer}</p>
            <p className="released">Released: {game.releaseDate}</p>
            {game.averageRating === null ? null : <p className="average-rating">Average Gameplay Rating:</p>}
            {game.averageRating === null ? null : <p className="average">{game.averageRating.toFixed(1)}/10</p>}
            {game.averageF2P === null ? null : <p className="average-rating">Average F2P Rating:</p>}
            {game.averageF2P === null ? null : <p className="average">{game.averageF2P.toFixed(1)}/10</p>}
            {game.iOS == null ? null : <a href={game.iOS} target="_blank" ><img src={iOS} className="dl-button2"></img></a>}
            {game.Android == null ? null : <a href={game.Android} target="_blank" ><img src={Android} className="dl-button"></img></a>}


          </div>
          <div className="articles">
            <h3>Reddit</h3>
            {(articles != null) ? articles.map((article, index) => <Article key={index} article={article.data} />) : ''}
          </div>
          <div className="articles">
          <TwitterTimelineEmbed
      sourceType="profile"
      screenName={game.twitter}
      options={{height: 800}, {width:350}}
    />
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