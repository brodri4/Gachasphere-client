// import React, { useEffect, useState } from "react";
// import { connect } from "react-redux";
// import { NavLink } from "react-router-dom";
// import { gameActions } from "../store/actions/gameActions";
// import axios from "axios";

// function ListGames(props) {
//   const [gamesList, setGamesList] = useState({});
//   const fetchGameList = async () => {
//     let list = await axios.get("http://localhost:8080/lists/gameList/2");

//     console.log(list.data);
//     await setGamesList(list.data);
//     console.log(list.data);
//   };
//   useEffect(() => {
//     // props.fetchGames();
//     fetchGameList();
//   }, []);

//   // add spinner here?
//   if (gamesList === null) {
//     return (
//       <div>
//         <h1>Loading!</h1>
//       </div>
//     );
//   } else {
//     let listOfGames = gamesList.gamesList.map((game) => {
//       let altText = `${game.game.title} logo`;
//       let gameLink = `/game/${game.game.id}`;
//       return (
//         <li key={game.game.id} className="game-item">
//           <NavLink to={gameLink}>
//             <div className="game-item_left">
//               <img
//                 src={game.game.logo}
//                 alt={altText}
//                 className="game-item_game_logo"
//               />
//               <h2 className="secondary-heading">{game.game.title}</h2>
//             </div>
//           </NavLink>
//           <div className="game-item_right">
//             <p className="developer">Developer:</p>
//             <p className="released">Released:</p>
//             {game.game.averageRating === null ? null : (
//               <p className="average-rating">Average Rating:</p>
//             )}
//             <p className="developer-name">{game.game.developer}</p>
//             <p className="release-date">{game.game.releaseDate}</p>
//             {game.game.averageRating === null ? null : (
//               <p className="average">{game.game.averageRating.toFixed(1)}/10</p>
//             )}
//           </div>
//         </li>
//       );
//     });

//     return (
//       <div className="games-page">
//         <h1 className="heading">{gamesList.Name}</h1>
//         <ul className="container_game-items">{listOfGames}</ul>
//       </div>
//     );
//   }
// }

// // const mapStateToProps = (state) => {
// //   return {
// //     games: state.gameR.games,
// //   };
// // };

// // const mapDispatchToProps = (dispatch) => {
// //   return {
// //     fetchGames: () => dispatch(gameActions.fetchGames()),
// //   };
// // };

// // export default connect(mapStateToProps, mapDispatchToProps)(ListGames);
// export default ListGames;

import React, { useEffect } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { gameActions } from "../store/actions/gameActions";

function ListGames(props) {
  useEffect(() => {
    props.fetchListGame(2);
  }, []);

  // add spinner here?
  if (!props.games.gamesList) {
    console.log(props.games.gamesList);
    return (
      <div>
        <h1>Loading!</h1>
      </div>
    );
  } else {
    let games = props.games.gamesList.map((game) => {
      let altText = `${game.game.title} logo`;
      let gameLink = `/game/${game.game.id}`;
      return (
        <li key={game.game.id} className="game-item">
          <NavLink to={gameLink}>
            <div className="game-item_left">
              <img
                src={game.game.logo}
                alt={altText}
                className="game-item_game_logo"
              />
              <h2 className="secondary-heading">{game.game.title}</h2>
            </div>
          </NavLink>
          <div className="game-item_right">
            <p className="developer">Developer:</p>
            <p className="released">Released:</p>
            {game.game.averageRating === null ? null : (
              <p className="average-rating">Average Rating:</p>
            )}
            <p className="developer-name">{game.game.developer}</p>
            <p className="release-date">{game.game.releaseDate}</p>
            {game.game.averageRating === null ? null : (
              <p className="average">{game.game.averageRating.toFixed(1)}/10</p>
            )}
          </div>
        </li>
      );
    });

    return (
      <div className="games-page">
        <h1 className="heading">{props.games.Name}</h1>
        <ul className="container_game-items">{games}</ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    games: state.gameR.games,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchListGame: (id) => dispatch(gameActions.fetchListGame(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListGames);
