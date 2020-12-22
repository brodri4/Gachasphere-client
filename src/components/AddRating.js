import React from 'react';

function AddRating(props) {

}

const mapStateToProps = (state) => {
    return {

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addRating: () => dispatch(gameActions.createRating())
    }
}