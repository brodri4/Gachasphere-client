import React, { useState, useEffect } from 'react';
import Article from './components/Article';
import { TwitterTimelineEmbed } from 'react-twitter-embed'
import '../index.css'

function Game() {
  const [articles, setArticles] = useState([]);
  //Pass in the subreddit name, twitter name
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
    <div class="gameComponent">
      <div class="articles">
        <h3>Reddit</h3>
        {(articles != null) ? articles.map((article, index) => <Article key={index} article={article.data} />) : ''}
      </div>
      <div class="articles">
      <TwitterTimelineEmbed
  sourceType="profile"
  //Pass in twitter name here
  screenName="ONE_PIECE_TC"
  options={{height: 800}, {width:350}}
/>
</div>
    </div>
  );
}

export default Game;