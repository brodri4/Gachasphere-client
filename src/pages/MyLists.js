import React from 'react';

// Components
import NotPlaying from '../components/NotPlaying';
import CurrentlyPlaying from '../components/CurrentlyPlaying';



function MyLists(props) {

    return (
        <div className='myLists-container'>
            <h1>Currently Playing</h1>
            <CurrentlyPlaying />
            <h1>No Longer Playing</h1>
            <NotPlaying />
        </div>
    );
}

export default MyLists;