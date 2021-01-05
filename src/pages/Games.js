import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { gameActions } from '../store/actions/gameActions';

// Components
import GameSearchField from "../components/GameSearchField";
import AddRating from "../components/AddRating";
import AddFilter from "../components/AddFilter";

function Games(props) {
    const [activeComponent, setActiveComponent] = useState("nada");

    const handleOnClick = () => {
        if (activeComponent === "nada") {
            setActiveComponent("AddRating");
        } else if (activeComponent === "AddRating") {
            setActiveComponent("nada");
        }
    };

    useEffect(() => {
        props.fetchGames()
    }, [])

    // add spinner here?
    if (!props.games || !props.games[0]) {
        return (
            <div>
                <h1>Loading!</h1>
            </div>
        )
    } else {

        let games = props.games.map(game => {
            let altText = `${game.title} logo`;
            let gameLink = `/game/${game.id}`;
            return (
                <li key={game.id} className="game-item">
                    <NavLink to={gameLink}><div className='game-item_left'>
                        <img src={game.logo} alt={altText} className="game-item_game_logo" />
                        <h2 className="secondary-heading">{game.title}</h2>
                    </div></NavLink>
                    <div className="game-item_right">
                        <p className="developer">Developer:</p>
                        <p className="released">Released:</p>
                        {game.averageRating === null ? null : <p className="average-rating">Average Rating:</p>}
                        <p className="developer-name">{game.developer}</p>
                        <p className="release-date">{game.releaseDate}</p>
                        {game.averageRating === null ? null : <p className="average">{game.averageRating.toFixed(1)}/10</p>}
                    </div>
                </li>
            )
        })

        return (
            <div className="games-page">
                <h1 className="heading">All Games</h1>
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
                <ul className="container_game-items">
                    {games}
                </ul>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        games: state.gameR.games
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchGames: () => dispatch(gameActions.fetchGames())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Games);