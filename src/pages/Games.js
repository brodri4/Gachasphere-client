import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { gameActions } from '../store/actions/gameActions';

function Games(props) {
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
            let gameLink = `/game/${game.id}`
            return ( 
                <li key={game.id} className="game-item">
                    <div className='game-item_left'>
                    <NavLink to={gameLink}><img src={game.logo} alt={altText} className="game-item_game_logo" /></NavLink>
                        <h2 className="secondary-heading">{game.title}</h2>
                    </div>
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