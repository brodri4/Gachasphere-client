import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Article from './components/Article';
import { useParams } from "react-router-dom"
import { TwitterTimelineEmbed } from 'react-twitter-embed'
import '../index.css'

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
        <div class="gameComponent">
          <div className='articles'>
            <img src={game.logo} alt={altText} className="game-item_game_logo" />
            <h2 className="secondary-heading">{game.title}</h2>
            <p className="developer">Developer: {game.developer}</p>
            <p className="released">Released: {game.releaseDate}</p>
            {game.averageRating === null ? null : <p className="average-rating">Average Gameplay Rating:</p>}
            {game.averageRating === null ? null : <p className="average">{game.averageRating.toFixed(1)}/10</p>}
            {game.averageF2P === null ? null : <p className="average-rating">Average F2P Rating:</p>}
            {game.averageF2P === null ? null : <p className="average">{game.averageF2P.toFixed(1)}/10</p>}

          </div>
          <div class="articles">
            <h3>Reddit</h3>
            {(articles != null) ? articles.map((article, index) => <Article key={index} article={article.data} />) : ''}
          </div>
          <div class="articles">
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