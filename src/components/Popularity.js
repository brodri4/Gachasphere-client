import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { gameActions } from '../store/actions/gameActions';

function Popularity(props) {

    useEffect(() => {
        props.fetchGames()
    }, [])

    if (!props.games || !props.games[0]) {
        return (
            <div>
                <h1>Nothing available :(</h1>
            </div>
        )
    } else {

        // sort by # of active players
        let f2p = props.games
            .sort((gameA, gameB) => gameB.numberOfPlayer - gameA.numberOfPlayer)
            .map(games => {
                let altText = `${games.title} logo`
                return (
                    <li key={games.id} className='homepage-item'>
                        <div className="rating-item_game">
                            <img src={games.logo} alt={altText} className="rating-item_game_logo" />
                        </div>
                        <div className='homepage-item_stat'>
                            <h3>{games.title}</h3>
                            <p>Active Players: {games.numberOfPlayer}</p>
                        </div>
                    </li>
                )
            })

        return (
            <div className='homepage-category-list'>
                <ul>
                    {f2p}
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

export default connect(mapStateToProps, mapDispatchToProps)(Popularity);