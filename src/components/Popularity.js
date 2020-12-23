import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { gameActions } from '../store/actions/gameActions';

function Popularity(props) {

    useEffect(() => {
        props.fetchGames()
    }, [])

    // sort by # of active players
    let f2p = props.gameRatings
        .sort((gameA, gameB) => gameB.Game.numberOfPlayer - gameA.Game.numberOfPlayer)
        .map(game => {
            let altText = `${game.Game.title} logo`
            return (
                <li key={game.id} className='homepage-item'>
                    <div className="rating-item_game">
                        <img src={game.Game.logo} alt={altText} className="rating-item_game_logo" />
                    </div>
                    <div className='homepage-item_stat'>
                        <h3>{game.Game.title}</h3>
                        <p>Active Players: {game.Game.numberOfPlayer}</p>
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

const mapStateToProps = (state) => {
    return {
        gameRatings: state.gameR.gameRatings
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchGames: () => dispatch(gameActions.fetchGames())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Popularity);