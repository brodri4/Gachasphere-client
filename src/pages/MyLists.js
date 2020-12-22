import React from 'react';

// Components
import NotPlaying from '../components/NotPlaying';
import CurrentlyPlaying from '../components/CurrentlyPlaying';
import AddRating from '../components/AddRating';



function MyLists(props) {

    return (
        <div>
            <h1>Currently Playing</h1>
            <CurrentlyPlaying />
            <h1>No Longer Playing</h1>
            <NotPlaying />
            <AddRating />
        </div>
    );
}

export default MyLists;