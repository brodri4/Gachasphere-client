import React, { useEffect } from 'react';
import { connect } from 'react-redux';
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
            return <li key={game.id} className="game-item">
                <div className='game-item_left'>
                    <img src={game.logo} alt={altText} className="game-item_game_logo" />

                </div>
                <div className="game-item_right">
                    <h3>{game.title}</h3>
                    <p>Developer: {game.developer}</p>
                    <p>Released: {game.releaseDate}</p>
                    {game.averageRating === null ? null : <p>Average Rating: {game.averageRating}</p>}

                </div>
            </li>
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