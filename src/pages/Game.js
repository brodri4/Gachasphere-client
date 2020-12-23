import React, { useState, useEffect } from 'react';
import Article from './components/Article';
import '../index.css'

function Game() {
  const [articles, setArticles] = useState([]);
  //Pass in the subreddit name and remove input box
  const [subreddit, setSubreddit] = useState('OnePieceTC');
  useEffect(() => {
    fetch("https://www.reddit.com/r/" + subreddit + "/hot" + ".json").then(
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
  }, [subreddit]);

  return (
    <div className="App">
      <div class="articles">
        <h3>Reddit</h3>
        {(articles != null) ? articles.map((article, index) => <Article key={index} article={article.data} />) : ''}
      </div>
    </div>
  );
}

export default Game;